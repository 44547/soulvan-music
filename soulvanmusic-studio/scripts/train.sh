#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Set up environment variables
export DATASET_PATH="./data/datasets"
export MODEL_PATH="./models"
export LOG_PATH="./logs"

# Create necessary directories if they don't exist
mkdir -p "$DATASET_PATH" "$MODEL_PATH" "$LOG_PATH"

# Activate the virtual environment (if applicable)
# source venv/bin/activate

# Run the training script
node src/ai/training.ts --dataset "$DATASET_PATH" --model "$MODEL_PATH" --log "$LOG_PATH/training.log" 

# Deactivate the virtual environment (if applicable)
# deactivate

echo "Training process initiated."