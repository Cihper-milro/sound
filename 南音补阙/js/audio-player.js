// 方言音频播放模块
const AudioPlayer = {
    audioElement: null,
    playButton: null,
    pauseButton: null,
    dialectSelect: null,
    currentAudio: null,
    
    // 音频数据配置 - 基于实际m4a文件结构
    audioFiles: {
        'meizhou': {
            name: '梅州话',
            files: [
                { name: '他们把教室都装上了空调', file: 'audios/梅州话/梅州话（他们把教室都装上了空调）.m4a' },
                { name: '他把橘子剥了皮，但是没吃', file: 'audios/梅州话/梅州话（他把橘子剥了皮，但是没吃）.m4a' }
            ],
            description: '客家话分支，梅州地区方言，保留古汉语特点。',
            coords: [24.3, 116.1],
            color: '#54a0ff'
        },
        'danjia': {
            name: '疍家话',
            files: [
                { name: '他们把教室都装上了空调', file: 'audios/疍家话/疍家话（他们把教室都装上了空调）.m4a' },
                { name: '河里游着好多小鱼', file: 'audios/疍家话/疍家话（河里游着好多小鱼）.m4a' }
            ],
            description: '水上居民方言，主要分布在广东沿海地区。',
            coords: [23.1, 113.3],
            color: '#1dd1a1'
        },
        'leizhou': {
            name: '雷州话',
            files: [
                { name: '他们把教室都装上了空调', file: 'audios/雷州话/雷州话（他们把教室都装上了空调）.m4a' },
                { name: '你去洗碗', file: 'audios/雷州话/雷州话（你去洗碗）.m4a' }
            ],
            description: '雷州半岛方言，属于闽语分支。',
            coords: [20.9, 110.1],
            color: '#feca57'
        },
        'shaoguan': {
            name: '韶关话',
            files: [
                { name: '他们把教室都装上了空调', file: 'audios/广东韶关话(他们把教室都装上了空调).m4a' }
            ],
            description: '粤北韶关地区方言，具有独特的地方特色。',
            coords: [24.8, 113.6],
            color: '#48dbfb'
        }
    },

    // 初始化音频播放器
    init: function() {
        this.audioElement = document.getElementById('dialect-audio');
        this.playButton = document.getElementById('play-audio');
        this.pauseButton = document.getElementById('pause-audio');
        this.dialectSelect = document.getElementById('audio-dialect');
        
        if (!this.audioElement || !this.playButton || !this.dialectSelect) {
            console.warn('音频播放器元素未找到');
            return;
        }
        
        this.bindEvents();
        console.log('音频播放器初始化完成');
    },

    // 绑定事件
    bindEvents: function() {
        const self = this;
        
        // 播放按钮点击事件
        this.playButton.addEventListener('click', function() {
            self.playSelectedAudio();
        });
        
        // 暂停按钮点击事件
        this.pauseButton.addEventListener('click', function() {
            self.pauseAudio();
        });
        
        // 方言选择变化事件
        this.dialectSelect.addEventListener('change', function() {
            self.onDialectChange(this.value);
        });
        
        // 音频播放事件
        this.audioElement.addEventListener('play', function() {
            self.onAudioPlay();
        });
        
        this.audioElement.addEventListener('pause', function() {
            self.onAudioPause();
        });
        
        this.audioElement.addEventListener('ended', function() {
            self.onAudioEnded();
        });
    },

    // 播放选中的音频
    playSelectedAudio: function() {
        const dialect = this.dialectSelect.value;
        
        if (!dialect) {
            Utils.showMessage('请先选择方言类型', 'warning');
            return;
        }
        
        const audioData = this.audioFiles[dialect];
        if (!audioData) {
            Utils.showMessage('该方言的音频文件不存在', 'error');
            return;
        }
        
        this.currentAudio = audioData;
        
        // 如果有多个音频文件，播放第一个
        if (audioData.files && audioData.files.length > 0) {
            const firstAudio = audioData.files[0];
            this.audioElement.src = firstAudio.file;
            
            // 显示音频信息
            this.showAudioInfo(audioData, firstAudio);
            
            // 播放音频
            this.audioElement.play().catch(error => {
                console.error('音频播放失败:', error);
                Utils.showMessage('音频播放失败，请检查文件路径或网络连接', 'error');
            });
        }
    },

    // 暂停音频
    pauseAudio: function() {
        this.audioElement.pause();
    },

    // 方言选择变化处理
    onDialectChange: function(dialect) {
        if (dialect && this.currentAudio && this.currentAudio !== this.audioFiles[dialect]) {
            // 如果选择了不同的方言，停止当前播放
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this.showPlayButton();
        }
    },

    // 音频开始播放
    onAudioPlay: function() {
        this.showPauseButton();
        Utils.showMessage('音频开始播放', 'info');
    },

    // 音频暂停
    onAudioPause: function() {
        this.showPlayButton();
    },

    // 音频播放结束
    onAudioEnded: function() {
        this.showPlayButton();
        Utils.showMessage('音频播放完成', 'info');
    },

    // 显示播放按钮
    showPlayButton: function() {
        this.playButton.style.display = 'inline-block';
        this.pauseButton.style.display = 'none';
    },

    // 显示暂停按钮
    showPauseButton: function() {
        this.playButton.style.display = 'none';
        this.pauseButton.style.display = 'inline-block';
    },

    // 显示音频信息
    showAudioInfo: function(audioData, currentFile) {
        const infoElement = document.getElementById('audio-info');
        const nameElement = document.getElementById('current-audio-name');
        const descElement = document.getElementById('audio-description');
        
        if (infoElement && nameElement && descElement) {
            if (currentFile) {
                nameElement.textContent = `${audioData.name} - ${currentFile.name}`;
            } else {
                nameElement.textContent = audioData.name;
            }
            descElement.textContent = audioData.description;
            infoElement.style.display = 'block';
        }
    },
    
    // 获取所有方言数据（供地图使用）
    getDialectData: function() {
        return this.audioFiles;
    }
};