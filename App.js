import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const predict = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://YOURUSERNAME-alzheimer-mri-detection.hf.space/api/predict/',
        { data: [image] }
      );
      setPredictions(response.data.data[0]);
    } catch (error) {
      alert('Error: Check your HuggingFace Space URL!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧠 Alzheimer Detection</Text>
        <Text style={styles.subtitle}>Brain MRI Analysis</Text>
      </View>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={takePhoto}>
          <Text style={styles.btnText}>📷 Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
          <Text style={styles.btnText}>🖼️ Pick Image</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.predictBtn, !image && styles.disabled]} 
        onPress={predict}
        disabled={!image || loading}
      >
        <Text style={styles.predictBtnText}>
          {loading ? '🔄 Analyzing...' : '🔍 Analyze MRI'}
        </Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0d47a1" />
          <Text style={styles.loadingText}>Analyzing your scan...</Text>
        </View>
      )}

      {predictions && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          {Object.entries(predictions).map(([key, value]) => (
            <View key={key} style={styles.resultRow}>
              <Text style={styles.className}>{key}</Text>
              <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${value * 100}%` }]} />
              </View>
              <Text style={styles.percentage}>{(value * 100).toFixed(1)}%</Text>
            </View>
          ))}
          <View style={styles.modelInfo}>
            <Text style={styles.infoText}>📊 Model: EfficientNet-B0</Text>
            <Text style={styles.infoText}>📈 Accuracy: 99.75%</Text>
            <Text style={styles.infoText}>📁 Dataset: 38,400 images</Text>
          </View>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Classes:</Text>
        <Text style={styles.infoItem}>🟢 Non Demented (Normal)</Text>
        <Text style={styles.infoItem}>🟡 Very Mild Demented</Text>
        <Text style={styles.infoItem}>🟠 Mild Demented</Text>
        <Text style={styles.infoItem}>🔴 Moderate Demented</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#0d47a1', padding: 20, alignItems: 'center', marginTop: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 14, color: '#b3e5fc', marginTop: 5 },
  imageContainer: { margin: 20, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden', height: 300, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  placeholderText: { color: '#999', fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20, marginBottom: 15 },
  btn: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, borderColor: '#0d47a1' },
  btnText: { color: '#0d47a1', fontWeight: 'bold' },
  predictBtn: { backgroundColor: '#ff6f00', marginHorizontal: 20, paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  predictBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  disabled: { opacity: 0.5 },
  loading: { alignItems: 'center', marginVertical: 20 },
  loadingText: { marginTop: 10, fontSize: 14, color: '#666' },
  resultsContainer: { margin: 20, backgroundColor: '#fff', borderRadius: 10, padding: 15 },
  resultsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#0d47a1' },
  resultRow: { marginBottom: 15 },
  className: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  barContainer: { height: 20, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' },
  bar: { height: '100%', backgroundColor: '#ff6f00' },
  percentage: { fontSize: 12, color: '#666', marginTop: 3 },
  modelInfo: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  infoText: { fontSize: 12, color: '#666', marginBottom: 5 },
  infoSection: { margin: 20, backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 40 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#0d47a1' },
  infoItem: { fontSize: 14, marginBottom: 8, color: '#333' },
});
