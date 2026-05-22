# 🧠 Alzheimer Disease Detection using Deep Learning (MRI)

## 📌 Overview

Early detection of Alzheimer’s Disease (AD) is critical for improving patient outcomes. This project presents a deep learning–based system that classifies brain MRI scans into four stages of Alzheimer’s progression.

The goal is not only to achieve high accuracy, but also to build a scalable and reproducible AI pipeline suitable for real-world medical applications.

---

## 🧪 Dataset

This project uses two MRI datasets:

* **Kaggle Dataset**

  * 33,984 MRI images
* **Mendeley Dataset**

  * 6,400 MRI images (T1-weighted)

### Classes:

* Non Demented
* Very Mild Demented
* Mild Demented
* Moderate Demented

> The datasets were balanced and combined to improve generalization and reduce bias.

---

## ⚙️ Approach

### 🔹 Preprocessing

* Resize images to 224x224
* Convert grayscale MRI → RGB (for pretrained models)
* Normalize using ImageNet statistics

### 🔹 Models Used

* Simple MLP (baseline)
* ResNet-18 (transfer learning)
* EfficientNet-B0 ✅ (best performance)

### 🔹 Pipeline

1. Data Loading
2. Preprocessing & Augmentation
3. Model Training
4. Evaluation
5. Deployment (basic interface)

---

## 📊 Results

| Model           | Performance |
| --------------- | ----------- |
| MLP             | Baseline    |
| ResNet-18       | Improved    |
| EfficientNet-B0 | ⭐ Best      |

> Final model achieved strong classification performance across all 4 Alzheimer stages.

---

## 🛠 Tech Stack

* Python
* PyTorch
* Torchvision
* NumPy
* OpenCV

---

## 🚀 How to Run

```bash
pip install -r requirements.txt
python train.py
```

---

## 📁 Project Structure

```
Alzheimer-AI-Detection/
│
├── README.md
├── requirements.txt
├── notebooks/
├── src/
├── results/
└── demo/
```

---

## ⚠️ Note

Due to dataset size, data is not included in this repository.

You can access it here:

* Kaggle: (add your link)
* Mendeley: (add your link)

---

## 💡 Key Highlights

* Multi-dataset integration (improves robustness)
* Model comparison (MLP vs CNN vs EfficientNet)
* Medical imaging pipeline design
* Scalable and reproducible workflow

---

## 🎯 Future Work

* Deploy as a web application
* Improve model explainability (Grad-CAM)
* Integrate with clinical systems

---

## 👨‍💻 Author

AI Engineer passionate about building real-world AI systems combining research and production-level solutions.
