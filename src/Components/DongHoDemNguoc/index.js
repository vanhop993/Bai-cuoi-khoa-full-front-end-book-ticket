import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class DongHoDemNguoc extends React.Component {
  constructor(props) {
    super();
    this.state = { time: {}, seconds: 300 };
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
      Swal.fire({
        html:
          '<div>Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời hạn 5 phút. <a class="text-danger" href="">Đặt vé lại</a></div>',
        allowOutsideClick: false,
        showConfirmButton: false,
        width: 800,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.time?.m > 9 ? (
          <>{this.state.time.m}</>
        ) : (
          <>0{this.state.time.m}</>
        )}
        :
        {this.state.time.s > 9 ? (
          <>{this.state.time.s}</>
        ) : (
          <>0{this.state.time.s}</>
        )}
      </>
    );
  }
}
