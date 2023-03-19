var currentMonth = document.getElementById("current-month");
        var days = document.getElementById("days");
        var prev = document.getElementById("prev");
        var next = document.getElementById("next");
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date();

        function checkIfToday(checkDate) {
            if(checkDate === date.getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                return true;
            }
            return false;
        }

        function createCalendar() {
            var monthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
			var monthLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
			var monthLastDay = new Date(date.getFullYear(), date.getMonth(), monthLastDate).getDay();
			var lastMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            var monthFirstDate = new Date(date.getFullYear(), date.getMonth()).getDate();

            calendarDates = []
            // adds the days from last month that are in the same week as the new month
            for (var i = monthFirstDay; i > 0; i--) {
                calendarDates.push(lastMonthLastDate - i + 1);
            }

            // adds the days from the current month
            for (var i = monthFirstDate; i <= monthLastDate; i++) {
                calendarDates.push(i);
            }

            // adds the days from the next month that are in the same week as the current month
            for (var i = monthLastDay; i < 6; i++) {
                calendarDates.push(i - monthLastDay + 1);
            }

            const rows = [];
            const numRows = calendarDates.length / 7;

			while(calendarDates.length > 0) {
				rows.push(calendarDates.splice(0, 7));
			}

            var dayHtml = "";
            for (var i = 0; i < rows.length; i++) {
                dayHtml += "<tr>";
                    for (var j = 0; j < 7; j++) {
                        if (checkIfToday(rows[i][j])) {
                            dayHtml += ("<td><strong>" + rows[i][j] + "</strong></td>");
                        } else {
                            dayHtml += ("<td>" + rows[i][j] + "</td>");
                        }
                    }
                dayHtml += "</tr>";
            }

            days.innerHTML = dayHtml;
            currentMonth.innerHTML = months[date.getMonth()] + " " + date.getFullYear();

        }

        createCalendar();

        function previousMonth() {
            date.setMonth(date.getMonth() - 1);
            createCalendar();
        }

        function nextMonth() {
            date.setMonth(date.getMonth() + 1);
            createCalendar();
        }