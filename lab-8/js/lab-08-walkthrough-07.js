/* add code here */
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");
//document.write(daysOfWeek+"<br>");
document.write("<table border=1>");

document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
  if (daysOfWeek[i].length < 4) day = daysOfWeek[i];
  else day = "<em>" + daysOfWeek[i] + "</em>";
  document.write("<th>" + day + "</th>");
}
document.write("</tr>");

const days = 30;
for (let i = 1; i <= days; i++) {
    if (i % 7 == 1) {
        document.write("<tr>");
    }
    document.write(`<td>${i}</td>`)
    if (i % 7 == 0) {
        document.write("</tr>");
    }
}

document.write("</table>");
