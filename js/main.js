document.addEventListener('DOMContentLoaded', () => {
    // 初期配列を生成
    visualizer.generateArray();

    // アルゴリズム選択の参照
    const algorithmSelect = document.getElementById('algorithm-select');
    
    // 新しい配列生成ボタン
    document.getElementById('generate-array').addEventListener('click', () => {
        visualizer.generateArray();
        document.getElementById('complexity').textContent = '-';
        enableControls();
    });

    // スタートボタン
    document.getElementById('start').addEventListener('click', async () => {
        disableControls();
        const selectedAlgorithm = algorithmSelect.value;
        
        try {
            switch (selectedAlgorithm) {
                case 'bubble':
                    await bubbleSort(visualizer);
                    break;
                case 'selection':
                    await selectionSort(visualizer);
                    break;
                case 'insertion':
                    await insertionSort(visualizer);
                    break;
                case 'quick':
                    await quickSort(visualizer);
                    break;
                case 'merge':
                    await mergeSort(visualizer);
                    break;
                case 'heap':
                    await heapSort(visualizer);
                    break;
            }
        } catch (error) {
            console.error('Sorting error:', error);
        }
        
        enableControls();
    });

    // リセットボタン
    document.getElementById('reset').addEventListener('click', () => {
        visualizer.generateArray();
        document.getElementById('complexity').textContent = '-';
        enableControls();
    });

    // アニメーション速度の調整（オプション）
    visualizer.setDelay(50); // 50ミリ秒のディレイ
});

// コントロールの有効化
function enableControls() {
    document.getElementById('algorithm-select').disabled = false;
    document.getElementById('generate-array').disabled = false;
    document.getElementById('start').disabled = false;
    document.getElementById('reset').disabled = false;
}

// コントロールの無効化
function disableControls() {
    document.getElementById('algorithm-select').disabled = true;
    document.getElementById('generate-array').disabled = true;
    document.getElementById('start').disabled = true;
    document.getElementById('reset').disabled = true;
} 