async function heapSort(visualizer) {
    document.getElementById('complexity').textContent = 'O(n log n)';
    const n = visualizer.array.length;

    // ヒープを構築
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(visualizer, n, i);
    }

    // ヒープから要素を1つずつ取り出す
    for (let i = n - 1; i > 0; i--) {
        await visualizer.swap(0, i);
        visualizer.markSorted(i);
        await heapify(visualizer, i, 0);
    }
    visualizer.markSorted(0);
}

async function heapify(visualizer, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        await visualizer.compare(left, largest);
        if (visualizer.array[left] > visualizer.array[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        await visualizer.compare(right, largest);
        if (visualizer.array[right] > visualizer.array[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        await visualizer.swap(i, largest);
        await heapify(visualizer, n, largest);
    }
} 