// API基础URL
const API_BASE_URL = 'http://localhost:8081';

// DOM元素
const dataList = document.getElementById('data-list');
const dataForm = document.getElementById('data-form');
const dataInput = document.getElementById('data-input');
const refreshBtn = document.getElementById('refresh-btn');

// 获取数据列表
async function fetchData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/data`);
        const data = await response.json();
        renderDataList(data);
    } catch (error) {
        console.error('获取数据失败:', error);
        alert('获取数据失败，请稍后重试');
    }
}

// 渲染数据列表
function renderDataList(data) {
    dataList.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        dataList.appendChild(div);
    });
}

// 提交新数据
async function submitData(event) {
    event.preventDefault();
    const value = dataInput.value.trim();
    if (!value) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: value }),
        });

        if (response.ok) {
            dataInput.value = '';
            fetchData();
        } else {
            throw new Error('提交失败');
        }
    } catch (error) {
        console.error('提交数据失败:', error);
        alert('提交数据失败，请稍后重试');
    }
}

// 事件监听
dataForm.addEventListener('submit', submitData);
refreshBtn.addEventListener('click', fetchData);

// 页面加载时获取数据
fetchData();