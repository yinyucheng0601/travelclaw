// 皮皮猪状态面板 - 主逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 状态数据
    let statusData = {
        model: 'deepseek/deepseek-chat',
        uptime: '2小时15分钟',
        taskQueue: 0,
        apiCalls: 42,
        lastUpdate: new Date(),
        isOnline: true
    };
    
    // DOM 元素
    const modelInfo = document.getElementById('model-info');
    const uptimeEl = document.getElementById('uptime');
    const taskQueueEl = document.getElementById('task-queue');
    const apiCallsEl = document.getElementById('api-calls');
    // const lastUpdateEl = document.getElementById('last-update');
    const refreshBtn = document.getElementById('refresh-btn');
    const modelSwitchBtn = document.getElementById('model-switch');
    const docsBtn = document.getElementById('docs-btn');
    const modelModal = document.getElementById('model-modal');
    const cancelModelBtn = document.getElementById('cancel-model');
    const confirmModelBtn = document.getElementById('confirm-model');
    const closeModalBtn = document.querySelector('.close-modal');
    const heroEl = document.querySelector('.hero');
    
    function attachHero() {
        if (!heroEl) return;
        if (heroEl.querySelector('img')) return;
        if (!navigator.onLine || statusData.isOnline === false) return;
        const img = document.createElement('img');
        img.src = 'assets/claw.png';
        img.alt = 'claw';
        img.className = 'claw-hero';
        heroEl.appendChild(img);
    }
    
    function detachHero() {
        if (!heroEl) return;
        heroEl.innerHTML = '';
    }
    
    // 初始化状态
    function initStatus() {
        updateStatusDisplay();
        refreshStatus();
        if (navigator.onLine) {
            attachHero();
        } else {
            detachHero();
        }
        
        // 添加一些初始动画
        setTimeout(() => {
            document.querySelectorAll('.status-item').forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animate-in');
            });
        }, 100);
    }
    
    // 更新状态显示
    function updateStatusDisplay() {
        modelInfo.textContent = statusData.model;
        uptimeEl.textContent = statusData.uptime;
        taskQueueEl.textContent = `${statusData.taskQueue}个待处理`;
        apiCallsEl.textContent = `今日: ${statusData.apiCalls}次`;
        
        // 不显示最后更新时间
        
        // 更新任务队列颜色
        if (statusData.taskQueue > 0) {
            taskQueueEl.style.color = '#ff6b6b';
        } else {
            taskQueueEl.style.color = '';
        }
        
        // 更新API调用颜色
        if (statusData.apiCalls > 100) {
            apiCallsEl.style.color = '#ff6b6b';
        } else if (statusData.apiCalls > 50) {
            apiCallsEl.style.color = '#ffa502';
        } else {
            apiCallsEl.style.color = '';
        }
    }
    
    // 模拟刷新状态
    function refreshStatus() {
        // 模拟数据更新
        const hours = Math.floor(Math.random() * 5) + 2;
        const minutes = Math.floor(Math.random() * 60);
        statusData.uptime = `${hours}小时${minutes}分钟`;
        
        statusData.taskQueue = Math.floor(Math.random() * 5);
        statusData.apiCalls += Math.floor(Math.random() * 10);
        // 不维护 lastUpdate
        
        updateStatusDisplay();
        showToast('状态已刷新 ✓');
        
        // 震动反馈（如果支持）
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    // 自动刷新（禁用）
    let autoRefreshInterval;
    function startAutoRefresh() {}
    function stopAutoRefresh() {}
    
    // 显示提示消息
    function showToast(message) {
        // 移除现有的提示
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 添加样式
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 1000;
            animation: toastFadeInOut 3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        
        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastFadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 3000);
    }
    
    // 打开模型切换模态框
    function openModelModal() {
        modelModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭模型切换模态框
    function closeModelModal() {
        modelModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // 切换模型
    function switchModel(newModel) {
        const oldModel = statusData.model;
        statusData.model = newModel;
        updateStatusDisplay();
        
        showToast(`模型已切换: ${oldModel} → ${newModel}`);
        
        // 模拟API调用
        statusData.apiCalls += 1;
        updateStatusDisplay();
    }
    
    // 事件监听器
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshStatus);
    }
    
    if (modelSwitchBtn) {
        modelSwitchBtn.addEventListener('click', openModelModal);
    }
    
    if (docsBtn) {
        docsBtn.addEventListener('click', function() {
            showToast('正在打开文档...');
            setTimeout(() => {
                window.open('https://docs.openclaw.ai', '_blank');
            }, 500);
        });
    }
    
    // 模型切换按钮
    document.querySelectorAll('.select-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modelOption = this.closest('.model-option');
            const modelName = modelOption.querySelector('.model-name').textContent;
            
            // 移除所有active类
            document.querySelectorAll('.model-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // 添加active类到当前选项
            modelOption.classList.add('active');
            
            // 更新确认按钮文本
            confirmModelBtn.textContent = `切换到 ${modelName}`;
        });
    });
    
    // 确认切换模型
    if (confirmModelBtn) confirmModelBtn.addEventListener('click', function() {
        const activeOption = document.querySelector('.model-option.active');
        if (activeOption) {
            const modelName = activeOption.querySelector('.model-name').textContent;
            if (modelName !== statusData.model) {
                switchModel(modelName);
            }
        }
        closeModelModal();
    });
    
    // 取消切换
    if (cancelModelBtn) cancelModelBtn.addEventListener('click', closeModelModal);
    
    // 点击关闭按钮
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModelModal);
    }
    
    // 点击模态框外部关闭
    if (modelModal) {
        modelModal.addEventListener('click', function(e) {
            if (e.target === modelModal) {
                closeModelModal();
            }
        });
    }
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // ESC 关闭模态框
        if (e.key === 'Escape' && modelModal && modelModal.style.display === 'flex') {
            closeModelModal();
        }
        
        // R 刷新状态
        if (e.key === 'r' || e.key === 'R') {
            if (!e.ctrlKey && !e.metaKey) {
                refreshStatus();
            }
        }
    });
    
    // 页面可见性变化（不自动刷新）
    document.addEventListener('visibilitychange', function() {});
    
    // 离线检测
    window.addEventListener('online', () => {
        statusData.isOnline = true;
        showToast('网络已恢复 ✓');
        attachHero();
    });
    
    window.addEventListener('offline', () => {
        statusData.isOnline = false;
        showToast('网络已断开，状态显示可能不及时');
        detachHero();
    });
    
    // 初始化应用
    initStatus();
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .status-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .status-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 显示欢迎消息
    setTimeout(() => {
        showToast('皮皮猪状态面板已加载 🦞');
    }, 1000);
});
