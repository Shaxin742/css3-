<template>
  <div class="main">
    <div class="timeBox">
      <div class="yearBox box">{{year}}</div>
      <div class="dayBox box" :style="'transform: rotate('+(360/dayList.length)*curDay+'deg)'">
        <ul class="container">
          <li
            v-for="(v,i) in dayList"
            :key="i"
            :style="'transform: rotate('+(-360/dayList.length) * (i+1) +'deg);transform-origin: -100% 50% 0px;margin-left:150px;margin-top:90px'"
          >{{v}}</li>
        </ul>
      </div>
      <div class="hourBox box" :style="'transform: rotate('+(-360/hourList.length)*curHour+'deg)'">
        <ul class="container">
          <li
            v-for="(v,i) in hourList"
            :key="i"
            :style="'transform: rotate('+(360/hourList.length)*i+'deg);transform-origin: -200% 50% 0px;margin-left:300px;margin-top:190px'"
          >{{v}}</li>
        </ul>
      </div>
      <div class="minutesBox box" :style="'transform: rotate('+(-360/minutesList.length)*curMin+'deg)'">
        <ul class="container">
          <li
            v-for="(v,i) in minutesList"
            :key="i"
            :style="'transform: rotate('+(360/minutesList.length)*i+'deg);transform-origin: -300% 50% 0px;margin-left:450px;margin-top:290px'"
          >{{v}}</li>
        </ul>
      </div>
       <div class="secondBox" :style="'transform: rotate('+(-360/secondsList.length)*curSec+'deg)'">
        <ul class="container">
          <li
            v-for="(v,i) in secondsList"
            :key="i"
            :style="'transform: rotate('+(360/secondsList.length)*i+'deg);transform-origin: -400% 50% 0px;margin-left:600px;margin-top:390px'"
          >{{v}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      data: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '佰', '仟', '万'],
      hourList: [],
      curHour: 0,
      dayList: [],
      curDay: 0,
      minutesList: [],
      curMin: 0,
      secondsList: [],
      curSec: 0,
      year: ''
    }
  },
  created () {
    this.dealData()
    this.secondsList = JSON.parse(JSON.stringify(this.minutesList))
    var sky = ['', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚']
    var land = ['', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申']
    var one = new Date().getFullYear() % 10
    var two = new Date().getFullYear() % 12
    this.year = sky[one] + land[two]
    setInterval(() => {
      this.getTime()
    }, 1000)
  },
  methods: {
    dealData () { // 生成数据
      // 星期
      for (let i = 0; i < 7; i++) {
        this.dayList.push('星期' + this.data[i + 1])
      }
      // 小时
      for (let i = 0; i < 24; i++) {
        if (i < 11) {
          this.hourList.push(this.data[i])
        } else {
          this.hourList.push((parseInt(i / 10) > 1 ? this.data[parseInt(i / 10)] : '') + '拾' + (parseInt(i % 10) !== 0 ? this.data[i % 10] : ''))
        }
      }
      // 分钟
      for (let i = 0; i < 60; i++) {
        if (i < 11) {
          this.minutesList.push(this.data[i])
        } else {
          this.minutesList.push((parseInt(i / 10) > 1 ? this.data[parseInt(i / 10)] : '') + '拾' + (parseInt(i % 10) !== 0 ? this.data[i % 10] : ''))
        }
      }
    },
    getTime () { // 获取时间
      var now = new Date()
      this.curSec = now.getSeconds()
      this.curDay = now.getDay()
      this.curMin = now.getMinutes()
      this.curHour = now.getHours()
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
  position: absolute;
  transition: 1s;
}
.main{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #ccc;
}
.yearBox{
  top: 50%;
  left: 50%;
  height: 40px;
  width: 40px;
  margin-top: -20px;
  margin-left: -20px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
.timeBox{
  width: 800px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}
.dayBox {
  width: 200px;
  height: 200px;
  top: 300px;
  left: 300px;
}
.hourBox {
  width: 400px;
  height: 400px;
  top: 200px;
  left: 200px;
}
.minutesBox {
  width: 600px;
  height: 600px;
  top: 100px;
  left: 100px;
}
.secondBox {
  width: 800px;
  height: 800px;
  top: 0;
  left: 0;
  position: absolute;
}
.container {
    overflow:auto;
    li {
      width: 50px;
      height: 20px;
      font-size: 12px;
      position: absolute;
    }
  }
</style>
