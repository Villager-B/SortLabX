class ArrayVisualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.array = [];
        this.maxValue = 15;
        this.delay = 50;
        this.stepCount = 0;
        this.comparisonCount = 0;
        this.swapCount = 0;
    }

    // 新しい配列を生成
    generateArray(size = 15) {
        const numbers = Array.from({length: 15}, (_, i) => i + 1);
        
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        this.array = numbers;
        this.resetCounts();
        this.render();
    }

    // カウンターをリセット
    resetCounts() {
        this.stepCount = 0;
        this.comparisonCount = 0;
        this.swapCount = 0;
        this.updateStats();
    }

    // 統計情報を更新
    updateStats() {
        document.getElementById('step-count').textContent = this.stepCount;
        document.getElementById('comparison-count').textContent = this.comparisonCount;
        document.getElementById('swap-count').textContent = this.swapCount;
    }

    // 配列を描画
    render() {
        this.container.innerHTML = '';
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${(value / this.maxValue) * 100}%`;
            bar.setAttribute('data-value', value);
            this.container.appendChild(bar);
        });
    }

    // 要素の比較を可視化
    async compare(i, j) {
        const bars = this.container.children;
        bars[i].classList.add('comparing');
        bars[j].classList.add('comparing');
        this.comparisonCount++;
        this.stepCount++;
        this.updateStats();
        await this.sleep();
        bars[i].classList.remove('comparing');
        bars[j].classList.remove('comparing');
    }

    // 要素の交換を可視化
    async swap(i, j) {
        const bars = this.container.children;
        bars[i].classList.add('swapping');
        bars[j].classList.add('swapping');
        
        // 値の交換
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;

        // 高さの交換
        const tempHeight = bars[i].style.height;
        bars[i].style.height = bars[j].style.height;
        bars[j].style.height = tempHeight;

        // データ値の交換
        const tempValue = bars[i].getAttribute('data-value');
        bars[i].setAttribute('data-value', bars[j].getAttribute('data-value'));
        bars[j].setAttribute('data-value', tempValue);

        this.swapCount++;
        this.stepCount++;
        this.updateStats();
        await this.sleep();
        bars[i].classList.remove('swapping');
        bars[j].classList.remove('swapping');
    }

    // 要素をソート済みとしてマーク
    markSorted(index) {
        const bars = this.container.children;
        bars[index].classList.add('sorted');
    }

    // 遅延を実装
    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    // アニメーション速度を設定
    setDelay(ms) {
        this.delay = ms;
    }
}

// グローバルインスタンスを作成
const visualizer = new ArrayVisualizer('array-container'); 