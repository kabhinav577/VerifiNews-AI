# VERIFINEWS-AI Model Comparison Report

## 📋 Executive Summary
- **Evaluation Date**: 2025-12-01 14:27:29
- **Test Set Size**: 4,492 samples
- **Models Evaluated**: distilbert, mobilebert

## 🏆 Performance Highlights

### Overall Winner: DistilBERT

### Key Metrics:

#### DistilBERT
- **Accuracy**: 0.9984
- **F1-Score**: 0.9984
- **Real News F1**: 0.9985
- **Fake News F1**: 0.9984
- **Inference Time**: 97.44 ms
- **Throughput**: 164.1 samples/sec

#### MobileBERT
- **Accuracy**: 0.9982
- **F1-Score**: 0.9982
- **Real News F1**: 0.9983
- **Fake News F1**: 0.9981
- **Inference Time**: 131.43 ms
- **Throughput**: 121.6 samples/sec

## 📊 Test Set Information
- **Total Samples**: 4,492
- **Real News**: 2,351 samples
- **Fake News**: 2,141 samples

## 🚀 Recommendations

### Best for Accuracy:
**DistilBERT** 
- Highest overall F1-Score

### Best for Speed:
**DistilBERT** 
- Fastest inference time

### Best Balance:
**DistilBERT** 
- Best trade-off between accuracy and speed

## 📁 Generated Files
1. `model_comparison_results.csv` - Complete comparison metrics
2. `detailed_metrics.json` - Detailed evaluation data
3. `model_comparison_comprehensive.png` - Main comparison visualization
4. `detailed_metrics_comparison.png` - Detailed metrics visualization
5. `*_confusion_matrix.csv` - Confusion matrices
6. `*_classification_report.csv` - Classification reports
7. `sample_predictions.csv` - Sample predictions

---
*Report generated automatically by VERIFINEWS-AI Model Comparison Notebook*
