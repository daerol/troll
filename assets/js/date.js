                // Initialize date
                var mydate = new Date();
                var year = mydate.getYear() + 1900;
                var day = mydate.getDay();
                var month = mydate.getMonth();         
                var daym = mydate.getDate();
                // Preparing to spit on the document :)
                
                var dayarray = new Array("Sunday","Monday","Tuesday", "Wednesday", "Thursday" , "Friday", "Saturday");
                var montharray = new Array ("January","February","March", "April", "May" , "June", "July","August", "September", "October" , "November", "December");
                //document.write(dayarray[day] + ", " + daym + " " + montharray[month] + " " +year + "<br>");

                document.getElementById("clockdisplay").innerHTML = dayarray[day] + ", " + daym + " " + montharray[month] + " " +year + "<br>";
                // End Date Init
                
                // Initialize time to be able to salute People
                var currentTime = new Date();
                var h = currentTime.getHours();
                hourarray = ["It's Midnight", "Good Night","Good Night","Good Night","Good Night","Good Morning","Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", " It's Lunch Time",
                         "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Evening", "Good Evening", "Good Evening", "Good Evening"];
                var salute = document.getElementById("salute").innerHTML = hourarray[h];
                // End Salute
                
                // Display the Local time with the magic of this method (toLocaleTimeString()) and set the interval to 1second
                var myVar = setInterval(myTimer, 1000);
                function myTimer() {
                    var d = new Date();
                    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
                }
