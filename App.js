import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([
    { id: '1', title: 'Buka app ini di Expo Go', done: true },
    { id: '2', title: 'Tambah tugas baru', done: false },
  ]);

  const sisa = useMemo(() => items.filter((i) => !i.done).length, [items]);

  const tambah = () => {
    const judul = text.trim();
    if (!judul) return;
    setItems((prev) => [{ id: String(Date.now()), title: judul, done: false }, ...prev]);
    setText('');
  };

  const toggle = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const hapus = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Daftar Tugas</Text>
          <Text style={styles.subtitle}>
            {sisa === 0 ? 'Semua selesai 🎉' : `${sisa} tugas belum selesai`}
          </Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Tulis tugas baru..."
            placeholderTextColor="#8b93a7"
            value={text}
            onChangeText={setText}
            onSubmitEditing={tambah}
            returnKeyType="done"
          />
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
            onPress={tambah}
          >
            <Text style={styles.addButtonText}>Tambah</Text>
          </Pressable>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Belum ada tugas.</Text>}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
              onPress={() => toggle(item.id)}
              onLongPress={() => hapus(item.id)}
            >
              <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
                {item.done ? <Text style={styles.check}>✓</Text> : null}
              </View>
              <Text style={[styles.cardText, item.done && styles.cardTextDone]}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />

        <Text style={styles.hint}>Ketuk untuk tandai selesai · tahan untuk hapus</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: '#0f1115' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  title: { color: '#f5f7fa', fontSize: 30, fontWeight: '700' },
  subtitle: { color: '#8b93a7', fontSize: 15, marginTop: 4 },
  inputRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, gap: 10 },
  input: {
    flex: 1,
    backgroundColor: '#1a1e27',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#f5f7fa',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4f7cff',
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  pressed: { opacity: 0.7 },
  list: { paddingHorizontal: 20, paddingBottom: 12, gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1e27',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4f7cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: '#4f7cff' },
  check: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cardText: { color: '#f5f7fa', fontSize: 16, flexShrink: 1 },
  cardTextDone: { color: '#6c7487', textDecorationLine: 'line-through' },
  empty: { color: '#6c7487', textAlign: 'center', marginTop: 24 },
  hint: { color: '#6c7487', fontSize: 12, textAlign: 'center', paddingVertical: 10 },
});
