import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
import os

# 📁 Paths
data_dir = "data/"  # folder with 4 classes
model_save_path = "model.pth"

# 🔹 Preprocessing (from your report)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.Grayscale(num_output_channels=3),  # convert to RGB
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# 📊 Load dataset
dataset = datasets.ImageFolder(data_dir, transform=transform)
train_loader = DataLoader(dataset, batch_size=32, shuffle=True)

# 🧠 Model (EfficientNet-B0 as best)
model = models.efficientnet_b0(pretrained=True)

# تعديل الطبقة الأخيرة (4 classes)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, 4)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# ⚙️ Training setup
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 🔁 Training loop
epochs = 5

for epoch in range(epochs):
    model.train()
    running_loss = 0.0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)

        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    print(f"Epoch [{epoch+1}/{epochs}], Loss: {running_loss:.4f}")

# 💾 Save model
torch.save(model.state_dict(), model_save_path)

print("Model saved!")
