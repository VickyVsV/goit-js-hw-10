import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as i,i as c}from"./assets/vendor-BbbuE1sJ.js";const t={btnEl:document.querySelector(".buttonStart"),inputEl:document.querySelector("input[id=datetime-picker]"),daysEl:document.querySelector("[data-days]"),hoursEl:document.querySelector("[data-hours]"),minutesEl:document.querySelector("[data-minutes]"),secondsEl:document.querySelector("[data-seconds]")};let s=null,r=null;t.btnEl.disabled=!0;t.inputEl.disabled=!1;t.btnEl.addEventListener("click",h);const m={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){new Date<e[0]?t.btnEl.disabled=!1:(t.btnEl.disabled=!0,c.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}))}},E=i("#datetime-picker",m);function f(e){const a=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),d=Math.floor(e%864e5%36e5/6e4),u=Math.floor(e%864e5%36e5%6e4/1e3);return{days:a,hours:l,minutes:d,seconds:u}}function h(){t.btnEl.disabled=!0,r=setInterval(()=>{t.inputEl.disabled=!0,y()},1e3)}function y(){const e=Date.now();if(s=E.selectedDates[0]-e,s>0){const n=f(s);t.daysEl.textContent=o(n.days),t.minutesEl.textContent=o(n.minutes),t.hoursEl.textContent=o(n.hours),t.secondsEl.textContent=o(n.seconds)}else clearInterval(r),t.inputEl.disabled=!1,t.daysEl.textContent="00",t.minutesEl.textContent="00",t.hoursEl.textContent="00",t.secondsEl.textContent="00"}function o(e){return e.toString().padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
