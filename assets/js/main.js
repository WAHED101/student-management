/* ========================
       BAR CHART (Attendance %)
    =========================*/
    const ctxBar = document.getElementById('attendanceChart').getContext('2d');

    const labelsBar = [
      '1','2','3','4','5','6','7','8','9','10',
      '11','12','13','14','15','16','17','18','19','20',
      '21','22','23','24','25','26','27','28','29','30'
    ];

    const dataBar = {
      labels: labelsBar,
      datasets: [{
        label: 'Attendance (%)',
        data: [
          90, 85, 92, 95, 100, 88, 91, 85, 93, 97,
          92, 89, 94, 100, 86, 90, 92, 88, 96, 91,
          95, 89, 90, 92, 97, 94, 88, 90, 93, 95
        ],
        backgroundColor: 'rgba(123, 97, 255, 0.7)',
        borderColor: '#7B61FF',
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: '#5A3FFF',
      }]
    };

    const configBar = {
      type: 'bar',
      data: dataBar,
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: value => value + '%'
            },
            title: {
              display: true,
              text: 'Attendance %'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day'
            },
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            displayColors: false,
            callbacks: {
              label: ctx => `Day ${ctx.label}: ${ctx.parsed.y}%`
            }
          }
        }
      }
    };

    new Chart(ctxBar, configBar);


    /* ==========================
       DOUGHNUT CHART (Subjects)
    ===========================*/
    const ctxPie = document.getElementById('subjectChart').getContext('2d');

    const dataPie = {
      labels: ['Math', 'English', 'Science', 'History'],
      datasets: [{
        label: 'Attendance %',
        data: [92, 88, 95, 85],
        backgroundColor: [
          '#7B61FF', // purple
          '#4CC9F0', // sky blue
          '#F9C74F', // yellow
          '#FF6B6B'  // red
        ],
        hoverOffset: 10,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    const configPie = {
      type: 'doughnut',
      data: dataPie,
      options: {
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 20,
              font: { size: 13, weight: '500' }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(30,30,40,0.9)',
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 13 },
            displayColors: false,
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed}%`
            }
          }
        },
        animation: {
          animateRotate: true,
          duration: 1200
        }
      }
    };

    new Chart(ctxPie, configPie);