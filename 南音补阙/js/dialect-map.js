// 方言文化地图模块 - 精简可用版
const DialectMap = {
    map: null,
    markers: [],          // 存储所有标记
    currentRegion: null,

    // 初始化地图
    init: function() {
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
        this.addMarkers();

        console.log('方言地图初始化完成');
    },

    // 初始化 Leaflet 地图
    initMap: function() {
        try {
            // 创建地图实例，中心为中国，缩放级别 5
            this.map = L.map('map-container').setView([35, 105], 5);

            // 添加 OpenStreetMap 底图
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            // 可选：添加比例尺
            L.control.scale({ imperial: false }).addTo(this.map);

            console.log('地图初始化成功');
        } catch (error) {
            console.error('地图初始化失败:', error);
            document.getElementById('map-container').innerHTML =
                '<div style="text-align: center; padding: 50px; color: #666;">' +
                '<h3>地图加载失败</h3><p>请检查网络连接或刷新页面</p></div>';
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
        regions.forEach((region, index) => {
            // 创建自定义图标（带颜色圆点）
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
                ">${index + 1}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            // 创建标记
            const marker = L.marker(region.coords, { 
                icon: icon,
                zIndexOffset: 100 // 控制标记层级，避免一直显示在最顶层
            })
                .addTo(this.map)
                .bindPopup(`<b>${region.name}</b><br>${region.desc}`);

            // 点击标记显示详细信息（可自定义显示区域）
            marker.on('click', function() {
                self.showRegionDetails(region);
            });

            // 保存标记以便后续操作
            this.markers.push({ marker, region });
        });
    },

    // 显示区域详情（更新页面下方的信息栏）
    showRegionDetails: function(region) {
        this.currentRegion = region;

        // 尝试更新页面上已有的元素（需提前在HTML中定义）
        const nameEl = document.getElementById('region-name');
        const infoEl = document.getElementById('region-info');
        const phrasesEl = document.getElementById('region-phrases');
        const detailsEl = document.getElementById('map-details');

        if (nameEl) nameEl.textContent = region.name;
        if (infoEl) {
            infoEl.innerHTML = `
                <p><strong>分布地区：</strong>${region.desc}</p>
                <p><strong>使用人口：</strong>${region.population}</p>
            `;
        }
        if (phrasesEl) {
            // 可自定义显示代表性词汇，这里用示例
            phrasesEl.innerHTML = '<h4>代表性词汇：</h4><ul><li>你好</li><li>谢谢</li><li>吃饭</li></ul>';
        }
        if (detailsEl) detailsEl.style.display = 'block';

        // 可选：移动地图中心到该区域
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

    // 修复控件层级问题
    fixControlZIndex: function() {
        // 获取地图容器
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;
        
        // 查找所有Leaflet控件元素并设置适当的z-index
        const controls = mapContainer.querySelectorAll('.leaflet-control-container .leaflet-control');
        controls.forEach(control => {
            control.style.zIndex = '100';
        });
        
        // 特别处理缩放控件
        const zoomControl = mapContainer.querySelector('.leaflet-control-zoom');
        if (zoomControl) {
            zoomControl.style.zIndex = '100';
        }
        
        console.log('地图控件层级修复完成');
    },

    // 清除所有高亮（如需扩展）
    clearHighlights: function() {
        this.markers.forEach(m => m.marker.setZIndexOffset(0));
    }
};

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保 Leaflet 已加载
    if (typeof L !== 'undefined') {
        DialectMap.init();
    } else {
        console.error('Leaflet 库未加载，请先引入 leaflet.js');
    }
});