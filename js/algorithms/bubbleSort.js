async function bubbleSort(visualizer) {
    const n = visualizer.array.length;
    document.getElementById('complexity').textContent = 'O(n²)';

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await visualizer.compare(j, j + 1);
            if (visualizer.array[j] > visualizer.array[j + 1]) {
                await visualizer.swap(j, j + 1);
            }
        }
        visualizer.markSorted(n - i - 1);
    }
    visualizer.markSorted(0);
} 