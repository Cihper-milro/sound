// 方言文化地图模块
const DialectMap = {
    map: null,
    markers: [],
    currentRegion: null,

    // 方言区域数据（保持不变）
    dialectRegions: [
        {
            id: 1,
            name: "北方官话区",
            coords: [39.9, 116.4],
            color: "#ff6b6b",
            description: "以北京话为代表的北方官话区，是现代汉语普通话的基础。分布在北京、天津、河北、山西、内蒙古等地。",
            population: "约4亿人",
            characteristics: "声调较少（通常4个），儿化音丰富，没有入声，鼻音韵尾分前后。",
            phrases: [
                "您好（nín hǎo）- 你好",
                "吃了没（chī le méi）- 吃饭了吗",
                "遛弯儿（liù wānr）- 散步",
                "倍儿棒（bèir bàng）- 非常好"
            ],
            sampleAudio: "普通话是北方官话的代表"
        },
        {
            id: 2,
            name: "吴语区（江浙沪）",
            coords: [31.2, 121.5],
            color: "#48dbfb",
            description: "以上海话、苏州话、杭州话为代表，保留古汉语入声，发音柔软优美，被称为'吴侬软语'。",
            population: "约8000万人",
            characteristics: "保留完整入声，声母分清浊，有连续变调，韵母丰富。",
            phrases: [
                "侬好（nóng hǎo）- 你好",
                "谢谢（xià xià）- 谢谢",
                "阿拉（ā lā）- 我们",
                "老灵格（lǎo líng gé）- 非常好"
            ],
            sampleAudio: "上海话是吴语的代表"
        },
        {
            id: 3,
            name: "粤语区（广东）",
            coords: [23.1, 113.3],
            color: "#1dd1a1",
            description: "以广州话为代表，保留完整的古汉语韵尾，声调丰富（通常9个），是海外华人社区的主要方言。",
            population: "约7000万人",
            characteristics: "保留完整入声-p、-t、-k，声调丰富，有长短元音对立，保留古汉语词汇。",
            phrases: [
                "早晨（zou2 san4）- 早上好",
                "唔该（m4 goi1）- 谢谢/请",
                "饮茶（jam2 caa4）- 喝茶吃点心",
                "靓仔（leng3 zai2）- 帅哥"
            ],
            sampleAudio: "粤语有'九声六调'之称"
        },
        {
            id: 4,
            name: "闽语区（福建）",
            coords: [26.1, 119.3],
            color: "#feca57",
            description: "以厦门话、福州话为代表，被称为古汉语的活化石，保留大量上古汉语特征。",
            population: "约6000万人",
            characteristics: "声母复杂，有'十五音'系统，保留上古汉语特征，文白异读丰富。",
            phrases: [
                "汝好（lí hó）- 你好",
                "多谢（to-siā）- 谢谢",
                "食饱未（tsia̍h-pá-buē）- 吃饱了吗",
                "真水（tsin suí）- 真漂亮"
            ],
            sampleAudio: "闽南语被称为'古汉语活化石'"
        },
        {
            id: 5,
            name: "湘语区（湖南）",
            coords: [28.2, 112.9],
            color: "#ff9ff3",
            description: "以长沙话为代表，声调变化丰富，富有音乐性，保留部分古全浊声母。",
            population: "约3600万人",
            characteristics: "声调6-7个，保留部分古全浊声母，有入声但韵尾合并，鼻化韵丰富。",
            phrases: [
                "你好（nǐ hǎo）- 你好",
                "多谢（duō xiè）- 谢谢",
                "恰饭（qià fàn）- 吃饭",
                "嬲塞（liǎo sāi）- 厉害"
            ],
            sampleAudio: "湖南话声调丰富有特色"
        },
        {
            id: 6,
            name: "客家话区",
            coords: [24.3, 116.1],
            color: "#54a0ff",
            description: "以梅县话为代表，保留了较多古汉语音韵特点，是汉族重要民系语言。",
            population: "约5000万人",
            characteristics: "保留古汉语入声-p、-t、-k，声调6个，有文白异读，词汇古朴。",
            phrases: [
                "你好（ngí hó）- 你好",
                "承蒙（shìn mùng）- 谢谢",
                "食朝（shìt zhāu）- 吃早饭",
                "恁仔细（an zì se）- 谢谢你"
            ],
            sampleAudio: "客家话保留大量古汉语特征"
        },
        {
            id: 7,
            name: "赣语区（江西）",
            coords: [28.7, 115.9],
            color: "#5f27cd",
            description: "以南昌话为代表，与客家话有亲缘关系，保留部分古汉语特点。",
            population: "约4800万人",
            characteristics: "声调6-7个，有入声但韵尾合并，部分古全浊声母清化，送气与否有辨义作用。",
            phrases: [
                "嫩好（nèn hǎo）- 你好",
                "多谢（dō xia）- 谢谢",
                "恰饭（qia fan）- 吃饭",
                "作兴（zok xin）- 喜欢"
            ],
            sampleAudio: "赣语是江西主要方言"
        },
        {
            id: 8,
            name: "西南官话区",
            coords: [30.6, 104.1],
            color: "#ff9f43",
            description: "以成都话、重庆话、武汉话为代表，语音系统相对简单，易懂易学。",
            population: "约2亿人",
            characteristics: "声调4个，入声归阳平，儿化音丰富，语气词多样。",
            phrases: [
                "你好噻（nǐ hǎo sāi）- 你好啊",
                "要得（yào déi）- 好的",
                "巴适（bā shì）- 舒服/好",
                "摆龙门阵（bǎi lóng mén zhèn）- 聊天"
            ],
            sampleAudio: "四川话幽默风趣"
        }
    ],

    // 初始化地图
    init: function() {
        // 检查地图容器是否存在
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) {
            console.error('地图容器 #map-container 未找到');
            return;
        }
        
        // 确保地图容器有高度
        if (!mapContainer.style.height) {
            mapContainer.style.height = '500px';
        }
        
        this.initMap();
        this.addDialectRegions();
        this.bindEvents();
        
        console.log('方言地图初始化完成');
    },

    // 初始化Leaflet地图
    initMap: function() {
        try {
            // 创建地图实例，设置中心为中国，缩放级别为5
            this.map = L.map('map-container').setView([35, 105], 5);
            
            // 添加OpenStreetMap图层
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 10,
                minZoom: 3
            }).addTo(this.map);
            
            // 添加中国边界（简化版）
            this.addChinaBoundary();
            
            // 添加比例尺
            L.control.scale({imperial: false}).addTo(this.map);
            
            console.log('Leaflet地图初始化成功');
        } catch (error) {
            console.error('地图初始化失败:', error);
            // 显示错误信息
            document.getElementById('map-container').innerHTML = 
                '<div style="text-align: center; padding: 50px; color: #666;">' +
                '<i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>' +
                '<h3>地图加载失败</h3>' +
                '<p>请检查网络连接或刷新页面重试</p>' +
                '</div>';
        }
    },

    // 添加中国边界（简化版）
    addChinaBoundary: function() {
        // 简化的中国边界坐标（实际应用中应使用更精确的GeoJSON数据）
        const chinaBounds = [
            [53.5, 73.5],  // 西北
            [53.5, 135.0], // 东北
            [18.0, 135.0], // 东南
            [18.0, 73.5]   // 西南
        ];
        
        L.polygon(chinaBounds, {
            color: '#f8f9fa',
            fillColor: '#f8f9fa',
            fillOpacity: 0.1,
            weight: 1
        }).addTo(this.map);
    },

    // 添加方言区域标记
    addDialectRegions: function() {
        const self = this;
        
        this.dialectRegions.forEach(region => {
            // 创建自定义图标
            const icon = L.divIcon({
                className: 'dialect-marker',
                html: `<div style="
                    background-color: ${region.color};
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                ">${region.id}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            // 创建标记
            const marker = L.marker(region.coords, { 
                icon: icon,
                zIndexOffset: 100 // 控制标记层级，避免一直显示在最顶层
            })
                .addTo(this.map)
                .bindPopup(`<b>${region.name}</b><br>${region.description.substring(0, 60)}...`);
            
            // 添加点击事件
            marker.on('click', function() {
                self.showRegionDetails(region);
            });
            
            // 保存标记引用
            this.markers.push({
                marker: marker,
                region: region
            });
        });
    },

    // 显示区域详情
    showRegionDetails: function(region) {
        this.currentRegion = region;
        
        // 更新详情区域
        document.getElementById('region-name').textContent = region.name;
        document.getElementById('region-info').innerHTML = `
            <p><strong>分布地区：</strong>${region.description}</p>
            <p><strong>使用人口：</strong>${region.population}</p>
            <p><strong>音频示例：</strong>${region.sampleAudio}</p>
        `;
        
        // 显示代表性词汇
        let phrasesHtml = '<h4>代表性词汇：</h4><ul>';
        region.phrases.forEach(phrase => {
            phrasesHtml += `<li>${phrase}</li>`;
        });
        phrasesHtml += '</ul>';
        document.getElementById('region-phrases').innerHTML = phrasesHtml;
        
        // 显示语言特点
        document.getElementById('region-characteristics').innerHTML = `
            <h4>语言特点：</h4>
            <p>${region.characteristics}</p>
        `;
        
        // 显示详情区域
        document.getElementById('map-details').style.display = 'block';
        
        // 平滑滚动到详情区域
        setTimeout(() => {
            Utils.scrollToElement('map-details', 100);
        }, 100);
        
        // 地图中心移动到该区域
        this.map.setView(region.coords, 6);
        
        Utils.showMessage(`已加载${region.name}的详细信息`, 'info');
    },

    // 绑定事件
    bindEvents: function() {
        const self = this;
        
        // 地图点击事件（点击空白处隐藏详情）
        this.map.on('click', function(e) {
            // 检查是否点击了标记以外的区域
            if (!e.originalEvent.target.closest('.dialect-marker')) {
                document.getElementById('map-details').style.display = 'none';
            }
        });
        
        // 方言图例点击事件
        document.querySelectorAll('.map-dialect').forEach((element, index) => {
            element.addEventListener('click', function() {
                const dialectColors = [
                    "#ff6b6b", "#48dbfb", "#1dd1a1", 
                    "#feca57", "#ff9ff3", "#54a0ff", "#5f27cd"
                ];
                
                const color = dialectColors[index];
                const region = self.dialectRegions.find(r => r.color === color);
                if (region) {
                    self.showRegionDetails(region);
                }
            });
        });
    },

    // 高亮指定方言区域
    highlightRegion: function(regionId) {
        // 清除所有高亮
        this.clearHighlights();
        
        // 高亮指定区域
        const target = this.markers.find(m => m.region.id === regionId);
        if (target) {
            target.marker.setZIndexOffset(1000);
            this.showRegionDetails(target.region);
        }
    },

    // 清除所有高亮
    clearHighlights: function() {
        this.markers.forEach(m => {
            m.marker.setZIndexOffset(0);
        });
    }
};