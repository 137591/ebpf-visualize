
document.addEventListener('DOMContentLoaded', function() {
    // Chart initialization
    const syncCtx = document.getElementById('sync').getContext('2d');
    const fsyncCtx = document.getElementById('fsync').getContext('2d');
    const epoll_waitCtx=document.getElementById('epoll_wait').getContext('2d');
    const sendmmsgCtx=document.getElementById('sendmmsg').getContext('2d');
    const connectCtx=document.getElementById('connect').getContext('2d');
    const recvmmsgCtx=document.getElementById('recvmmsg').getContext('2d');
    const futexCtx=document.getElementById('futex').getContext('2d');
    const sched_yieldCtx=document.getElementById('sched_yield').getContext('2d');
    const semopCtx=document.getElementById('semop').getContext('2d');
    const semctlCtx=document.getElementById('semctl').getContext('2d');
    const acceptCtx=document.getElementById('accept').getContext('2d');

    

    const syncChart = new Chart(syncCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'sync',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const fsyncChart = new Chart(fsyncCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'fsync',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const epoll_waitChart = new Chart(epoll_waitCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'epoll_wait',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const sendmmsgChart = new Chart(sendmmsgCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'sendmmsgCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const connectChart = new Chart(connectCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'connectCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const recvmmsgChart = new Chart(recvmmsgCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'recvmmsgCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const futexChart = new Chart(futexCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'futexCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const sched_yieldChart = new Chart(sched_yieldCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'sched_yieldCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const semopChart = new Chart(semopCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'semopCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const semctlChart = new Chart(semctlCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'semctlCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    const acceptChart = new Chart(acceptCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'acceptCtx',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
    


    function fetchData() {

        fetch('data/data.json')
            .then(response => response.json())
            .then(data => {
                updateChart(syncChart, data.sync);
                updateChart(fsyncChart, data.fsync);
                updateChart(epoll_waitChart, data.epoll_wait);
                updateChart(sendmmsgChart, data.sendmmsg);
                updateChart(connectChart, data.connect);
                updateChart(recvmmsgChart, data.recvmmsg);
                updateChart(futexChart, data.futex);
                updateChart(sched_yieldChart, data.sched_yield);
                updateChart(semopChart, data.semop);
                updateChart(semctlChart, data.semctl);
                updateChart(acceptChart, data.accept);
         
            })
            .catch(error => console.error('Error fetching data:', error));
    }
 
    function updateChart(chart, data) {
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.values;
        chart.update();
    }

    fetchData();
    setInterval(fetchData, 5000);

    const hostSelect = document.getElementById('script');
    const metricsSelect = document.getElementById('service');

    function updateChartVisibility() {
        const selectedHost = hostSelect.value;
        const selectedMetrics = metricsSelect.value;
        console.log(selectedHost);
        console.log(selectedMetrics);
    
        if (selectedHost === 'Host1' && selectedMetrics === 'syscall') {
            console.log("满足syscall");
            document.querySelectorAll('.chart-container').forEach(container => {
                container.style.display = 'block';
            });
            // 确保 LLC MPKI 和 Memory Bandwidth 图表容器隐藏
            if (document.getElementById('llcMpkIContainer')) {
                document.getElementById('llcMpkIContainer').style.display = 'none';
            }
            if (document.getElementById('MemBandwidthContainer')) {
                document.getElementById('MemBandwidthContainer').style.display = 'none';
            }
        } else if (selectedMetrics === 'llc mpki') {
            console.log("llc mpki");
            document.querySelectorAll('.chart-container').forEach(container => {
                container.style.display = 'none';
            });
    
            // 确保图表数据更新并显示 LLC MPKI 图表容器
            fetchLLCMpkIData().then(() => {
                if (document.getElementById('llcMpkIContainer')) {
                    document.getElementById('llcMpkIContainer').style.display = 'block';
                } else {
                    console.error('llcMpkIContainer does not exist.');
                }
            });
        } else if (selectedMetrics === 'memory bandwidth') {
            console.log("memory bandwidth");
            document.querySelectorAll('.chart-container').forEach(container => {
                container.style.display = 'none';
            });
    
            // 确保 LLC MPKI 图表容器隐藏
            if (document.getElementById('llcMpkIContainer')) {
                document.getElementById('llcMpkIContainer').style.display = 'none';
            }
    
            // 新建一个容器并显示内存带宽图表
            fetchMemBandwidthData().then(() => {
                if (document.getElementById('MemBandwidthContainer')) {
                    document.getElementById('MemBandwidthContainer').style.display = 'block';
                } else {
                    console.error('MemBandwidthContainer does not exist.');
                }
            });
        } else {
            console.log("其他选项");
            document.querySelectorAll('.chart-container').forEach(container => {
                container.style.display = 'none';
            });
            // 确保 LLC MPKI 和 Mem Bandwidth 图表容器隐藏
            if (document.getElementById('llcMpkIContainer')) {
                document.getElementById('llcMpkIContainer').style.display = 'none';
            }
            if (document.getElementById('MemBandwidthContainer')) {
                document.getElementById('MemBandwidthContainer').style.display = 'none';
            }
        }
    }
    
    let llcMpkIChart;
    let memBandwidthChart;
    
    function fetchLLCMpkIData() {
        return fetch('data/data1.json')
            .then(response => response.json())
            .then(data => {
                if (llcMpkIChart) {
                    console.log('存在llcMpkIChart');
                    updateChart(llcMpkIChart, data.llc_mpkI);
                } else {
                    console.log('不存在llcMpkIChart');
                    const llcMpkIContainer = document.createElement('div');
                    llcMpkIContainer.classList.add('chart-container');
                    llcMpkIContainer.id = 'llcMpkIContainer';
                    llcMpkIContainer.innerHTML = '<canvas id="llcMpkI"></canvas>';
                    document.querySelector('.charts').appendChild(llcMpkIContainer);
                    const llcMpkIChartCtx = document.getElementById('llcMpkI').getContext('2d');
                    llcMpkIChart = new Chart(llcMpkIChartCtx, {
                        type: 'line',
                        data: {
                            labels: data.llc_mpkI.labels,
                            datasets: [{
                                label: 'LLC MPKI',
                                data: data.llc_mpkI.values,
                                borderColor: 'rgba(153, 102, 255, 1)',
                                borderWidth: 1,
                                fill: false
                            }]
                        }
                    });
                }
            })
            .catch(error => console.error('Error fetching LLC MPKI data:', error));
    }
    
    function fetchMemBandwidthData() {
        return fetch('data/data2.json')
            .then(response => response.json())
            .then(data => {
                // 先销毁旧的 memBandwidthChart 实例
                if (memBandwidthChart) {
                    console.log('销毁 memBandwidthChart');
                    memBandwidthChart.destroy();
                }
    
                console.log('创建新的 memBandwidthChart');
                const MemBandwidthContainer = document.createElement('div');
                MemBandwidthContainer.classList.add('chart-container');
                MemBandwidthContainer.id = 'MemBandwidthContainer';
                MemBandwidthContainer.innerHTML = '<canvas id="memBandwidth"></canvas>';
                document.querySelector('.charts').appendChild(MemBandwidthContainer);
                const memBandwidthChartCtx = document.getElementById('memBandwidth').getContext('2d');
                memBandwidthChart = new Chart(memBandwidthChartCtx, {
                    type: 'line',
                    data: {
                        labels: data.mem_band.labels,
                        datasets: [{
                            label: 'Memory Bandwidth',
                            data: data.mem_band.values,
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            fill: false
                        }]
                    }
                });
            })
            .catch(error => console.error('Error fetching mem_band data:', error));
    }
    
    
    hostSelect.addEventListener('change', updateChartVisibility);
    metricsSelect.addEventListener('change', updateChartVisibility);
    updateChartVisibility();






//当用户改变 hostSelect 或 metricsSelect 的选择时，updateChartVisibility 函数会被调用，来更新图表容器的显示状态。
    // Container switch functionality
    const containers = document.querySelectorAll('.container');
    const icons = document.querySelectorAll('.sidebar .icon');

    icons.forEach((icon, index) => {
        icon.addEventListener('click', async() => {
            containers.forEach(container => container.style.display = 'none');
            containers[index].style.display = 'block';
            if(containers[index].id==='container2'){
                try{
                    const module = await import('./container2.js');
                    module.initContainer2();
                    console.log('页面切换');
                }catch(error){
                    console.error('Error loading container2.js',error);
                }
            }else if(containers[index].id==='container3'){
                try{
                    console.log("异常数据");
                }catch(error){
                    console.error('Error loading container3.js',error);
                }
            }
        });
    });
});