export function checkValidToken() {
    let timeList = readUserTokenTime();
    if (timeList === null) {
      return false;
    }
    let currentTime = new Date();
    let tokenTime = Date.UTC(
      timeList[0],
      timeList[1],
      timeList[2],
      timeList[3],
      0,
      0,
      0
    );
    let diff_ms = currentTime.getTime() - tokenTime;
    // token is valid for 6 hours
    let diff_hours = diff_ms / 1000 / 60 / 60;
    if (diff_hours <= 1) {
      return true;
    }
    return false;
  };

export function readUserTokenTime() {
    let token_time_data = localStorage.getItem("user_token_time");
    if (token_time_data !== null) {
      return JSON.parse(token_time_data);
    } else {
      return null;
    }
  };


