// container2.js

export function initContainer2() {
    let httpRequestsChart, httpErrorsChart, httpLatencyChart, httpResponseDataChart;
    console.log('欢迎来到container2');

    async function fetchAndRenderCharts(fileName, chartLabel) {
        try {
            const response = await fetch(fileName);
            const data = await response.json();
            
            const chartsDiv = document.querySelector('#container2 .charts');
            chartsDiv.innerHTML = ''; // 清空之前的内容
            
            for (const [key, value] of Object.entries(data)) {
                // 创建一个新的 container
                const container = document.createElement('div');
                container.className = 'chart-container';
                
                const canvas = document.createElement('canvas');
                canvas.className = 'chart-canvas';
                container.appendChild(canvas);
                
                const config = {
                    type: 'line',
                    data: {
                        labels: value.labels,
                        datasets: [{
                            label: key,
                            data: value.values,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false,
                            tension: 0.1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `${chartLabel} - ${key}`
                            }
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Value'
                                }
                            }
                        }
                    }
                };
    
                new Chart(canvas.getContext('2d'), config);
                
                // 把生成的 container 添加到指定的 charts div 中
                chartsDiv.appendChild(container);
            }
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    }
    
    
    

    // 初始化 container2 的功能
    function initContainer2Functions() {
        console.log('切换到 container2，初始化函数');
        createCharts();
        fetchDataForCharts(); // 获取数据并更新图表
        setInterval(fetchDataForCharts, 10000); // 每 10 秒重新获取数据
    }

    const container2 = document.getElementById('container2');
    container2.style.display='block';
    // 监听 hostSelect 和 metricsSelect 的变化事件
    const hostSelect = document.getElementById('script2');
    const metricsSelect = document.getElementById('service2');




    function updateChartVisibility() {
        const selectedHost = hostSelect.value;
        const selectedMetrics = metricsSelect.value;

        if (selectedHost === 'pods1' && selectedMetrics === 'cpu') {
            //折线图
            fetchAndRenderCharts('./data/cpu.json', 'CPU Data');
            
            // handleContainerVisibility(); // 切换 container2 的显示状态
        } else if(selectedHost === 'pods1' && selectedMetrics === 'memory'){
            //折线图
            memory()
        }else if(selectedHost === 'pods1' && selectedMetrics === 'corepmu'){
            //
            console.log('corepmu');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'syscall'){
            //表格
            console.log('syscall');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'irq'){
            //表格
            console.log('irq');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'context'){
            //
            console.log('context');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'page'){
            console.log('page');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'rtt'){
            //直方图
            console.log('rtt');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'tcp'){
            
            console.log('tcp');
        }else if(selectedHost === 'pods1' && selectedMetrics === 'iosize'){
            console.log('iosize');
        }
        
    }

    hostSelect.addEventListener('change', updateChartVisibility);
    metricsSelect.addEventListener('change', updateChartVisibility);

    // 初始更新图表可见性
    updateChartVisibility();
}
