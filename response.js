/*
만능봇
© 2021 Dark Tornado, All rights reserved.
*/

const ZoneID = {
    "서울": 1159068000,
    "부산": 2611053000,
    "춘천": 4211070500,
    "강릉": 4215052000,
    "인천": 2811058500,
    "수원": 4111356000,
    "청주": 4311374100,
    "홍성": 4480025600,
    "대전": 3017063000,
    "안동": 4514053000,
    "포항": 4711155000,
    "울산": 3111058500,
    "대구": 2714059000,
    "전주": 4511357000,
    "목포": 4611055400,
    "광주": 2917060200,
    "여수": 4613057000,
    "창원": 4812552000,
    "제주": 5011059000
};

const Tools = {};
Tools.getWeather = (zone) => {
    if (!ZoneID.hasOwnProperty(zone)) return "해당 위치를 찾을 수 없어요";
    var data = org.jsoup.Jsoup.connect("http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=" + ZoneID[zone])
        .get();
    var time = data.select("pubDate").text();
    time = time.substring(time.indexOf(" ") + 1);
    var location = data.select("category").text();
    data = data.select("data").get(0);
    var status = data.select("wfKor").text();
    var tmp = data.select("temp").text();
    var hum = data.select("reh").text();

    var result = "현재날씨 \"" + status + "\"\n\n";
    result += "기온 - " + tmp + "도\n";
    result += "습도 - " + hum + "%\n\n";
    result += "기상청 측정시간 :\n";
    result += time + "\n\n";
    result += "기상청 측정위치 :\n";
    result += location;
    return result;
};


function response(room, msg, sender, isGroupChat, replier) {

    /* 메인 */
    if (msg == "/만능 심심해") {
        replier.reply("아래와 같이 적어보세요!\n\n" +
            "/만능 날씨\n" +
            "/만능 몇시야\n" +
            "/만능 점심\n" +
            "/만능 메뉴추천\n" +
            "/만능 음식종류\n" +
            "/만능 맛집\n" +
            "/만능 가위바위보\n" +
            "/만능 이름궁합\n" +
            "/만능 전화번호궁합\n" +
            "/만능 코인\n" +
            "/만능 오늘의실거래");
    }

    /* 날씨 */
    if (msg == "/만능 날씨") {
        replier.reply("날씨는 이렇게 물어보세요.\n\n" +
            "\"예시) 만능 날씨 서울\"\n\n" +
            "위치 리스트\n" +
            "서울,부산,춘천,강릉,인천,수원,청주,홍성,대전,안동,포항,울산,대구,전주,목포,광주,여수,창원,제주");
    } else if (msg.startsWith("/만능 날씨 ")) {
        var zone = msg.replace("/만능 날씨 ", "");
        replier.reply(Tools.getWeather(zone));
    }

    /* 시간 */
    if (msg == "/만능 몇시야") {
        var day = new Date();
        replier.reply("지금 시각은 " + (day.getMonth() + 1) + "월 " + day.getDate() + "일 " +
            day.getHours() + "시 " + day.getMinutes() + "분 입니다.");
    }

}