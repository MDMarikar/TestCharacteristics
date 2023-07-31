        var population = 10000;
        var prevalence = 0.5;
        var sensitivity = 0.8;
        var specificity = 0.8;

        function updateDiagram() {
            // Calculating values based on prevalence, sensitivity, and specificity
            var positive = population * prevalence;
            var negative = population - positive;

            var truePositive = positive * sensitivity;
            var falseNegative = positive - truePositive;

            var trueNegative = negative * specificity;
            var falsePositive = negative - trueNegative;

            // Update Confusion Matrix
            document.getElementById("truePositive").textContent = Math.round(truePositive);
            document.getElementById("falsePositive").textContent = Math.round(falsePositive);
            document.getElementById("trueNegative").textContent = Math.round(trueNegative);
            document.getElementById("falseNegative").textContent = Math.round(falseNegative);
            document.getElementById("totalPositive").textContent = Math.round(truePositive + falsePositive);
            document.getElementById("totalNegative").textContent = Math.round(trueNegative + falseNegative);
            document.getElementById("totalDisease").textContent = Math.round(positive);
            document.getElementById("totalNoDisease").textContent = Math.round(negative);

            // Calculate metrics based on Confusion Matrix
            var calculatedSensitivity = truePositive / (truePositive + falseNegative);
            var calculatedSpecificity = trueNegative / (trueNegative + falsePositive);
            var PPV = truePositive / (truePositive + falsePositive);
            var NPV = trueNegative / (trueNegative + falseNegative);

       


          
          // Update calculations
document.getElementById("calculations").innerHTML = `
    <tr>
        <td>Sensitivity</td>
        <td>${truePositive.toFixed()} / (${truePositive.toFixed()} + ${falseNegative.toFixed()}) = ${sensitivity.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Specificity</td>
        <td>${trueNegative.toFixed()} / (${trueNegative.toFixed()} + ${falsePositive.toFixed()}) = ${specificity.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Positive Predictive Value (PPV)</td>
        <td>${truePositive.toFixed()} / (${truePositive.toFixed()} + ${falsePositive.toFixed()}) = ${PPV.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Negative Predictive Value (NPV))</td>
        <td>${trueNegative.toFixed()} / (${trueNegative.toFixed()} + ${falseNegative.toFixed()}) = ${NPV.toFixed(2)}</td>
    </tr>
`;

          

            // Update PPV and NPV visualizations
            document.getElementById('PPVBar').value = PPV;
            document.getElementById('NPVBar').value = NPV;
            document.getElementById('PPVValue').textContent = PPV.toFixed(2);
            document.getElementById('NPVValue').textContent = NPV.toFixed(2);

            // Draw the pie charts
            drawPieChart("diseaseCanvas", [truePositive, falseNegative], ["red", "green"]);
            drawPieChart("nonDiseaseCanvas", [trueNegative, falsePositive], ["green", "red"]);

            updateROC();
        }



       function updateROC() {
      var TPR = sensitivity; 
      var FPR = 1 - specificity; 

      var canvas = document.getElementById('ROCCanvas');
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(canvas.width, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(FPR * canvas.width, (1 - TPR) * canvas.height, 5, 0, 2 * Math.PI, false);
      ctx.fill();

      // Add labels
      ctx.font = '14px Arial';
      ctx.fillText('1 - Specificity', canvas.width / 2, canvas.height - 5);
      ctx.save();
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('Sensitivity', -canvas.height / 2, 15);
      ctx.restore();
  }


        function drawPieChart(canvasId, data, colors) {
            var canvas = document.getElementById(canvasId);
            var ctx = canvas.getContext("2d");
            var total = data.reduce((a, b) => a + b, 0);
            var angleStart = 0;
            for (var i in data) {
                ctx.beginPath();
                ctx.arc(100, 100, 100, angleStart, angleStart + Math.PI * 2 * (data[i] / total), false);
                ctx.lineTo(100, 100);
                ctx.fillStyle = colors[i];
                ctx.fill();
                angleStart += Math.PI * 2 * (data[i] / total);
            }
        }

        function setupSliders() {
            var prevalenceRange = document.getElementById('prevalenceRange');
            var prevalenceValue = document.getElementById('prevalenceValue');
            prevalenceValue.textContent = prevalenceRange.value;
            prevalenceRange.oninput = function() {
                prevalenceValue.textContent = this.value;
                prevalence = this.value / 100;
                updateDiagram();
            }

            var sensitivityRange = document.getElementById('sensitivityRange');
            var sensitivityValue = document.getElementById('sensitivityValue');
            sensitivityValue.textContent = sensitivityRange.value;
            sensitivityRange.oninput = function() {
                sensitivityValue.textContent = this.value;
                sensitivity = this.value / 100;
                updateDiagram();
            }

            var specificityRange = document.getElementById('specificityRange');
            var specificityValue = document.getElementById('specificityValue');
            specificityValue.textContent = specificityRange.value;
            specificityRange.oninput = function() {
                specificityValue.textContent = this.value;
                specificity = this.value / 100;
                updateDiagram();
            }
        }

        setupSliders();
        updateDiagram();
