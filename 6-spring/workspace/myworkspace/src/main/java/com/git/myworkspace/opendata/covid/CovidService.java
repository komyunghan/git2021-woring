package com.git.myworkspace.opendata.covid;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

// 서비스 컴포넌트
// 1. 외부 시스템 통신
// 2. 데이터 트랜잭션 처리
@Service
public class CovidService {

	private final String SERVICE_KEY = "kIci58dD5oRPIeBemMQcKNKk%2BsRNQLioJyBe363t2N84JpDaHdxFa%2BF2zlogkb7P7h7i2TnogI4SyaHkixnCHw%3D%3D";

	private CovidSidoDailyRepository repo;

	@Autowired
	public CovidService(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	@Scheduled(cron = "0 40 12 * * *")
//	@Scheduled(fixedRate = 1000 * 60 * 60 * 1)
	@CacheEvict(value = "covid-current", allEntries = true)
	@SuppressWarnings("deprecation")
	public void requestCovidSidoDaily() throws IOException {
		System.out.println(new Date().toLocaleString());
		StringBuilder builder = new StringBuilder();
		builder.append("http://openapi.data.go.kr/openapi"); // 호스트/게이트웨이
		builder.append("/service/rest"); // 서비스
		builder.append("/Covid19/getCovid19SidoInfStateJson"); // 기능
		builder.append("?serviceKey=" + SERVICE_KEY); // 서비스키

		System.out.println(builder.toString());

		// 2. URL 객체 생성
		URL url = new URL(builder.toString());

		// 3. Http 접속 생성
		HttpURLConnection con = (HttpURLConnection) url.openConnection();

		// 4. byte[]배열로 데이터를 읽어옴
		byte[] result = con.getInputStream().readAllBytes();

		// 5. byte[] -> 문자열(XML) 변환
		String data = new String(result, "UTF-8");
		System.out.println(data);
		/* ---------------------- 데이터 요청하고 XML 받아오기 끝 ----------------- */

		/* ---------------------- XML -> JSON -> Object(Java) 시작 ----------------- */
		// XML(문자열) -> JSON(문자열)
		String json = XML.toJSONObject(data).toString(2);
		System.out.println(json);

		// JSON(문자열) -> Java(object)
		CovidSidoDailyResponse response = new Gson().fromJson(json, CovidSidoDailyResponse.class);
		System.out.println(response);

//		// 강동구 데이터
//		AirSigunguHourResponse.Item item = response.getResponse().getBody().getItems().getItem().get(1);
//		System.out.println(item);
		/* ---------------------- XML -> JSON -> Object(Java) 끝 ----------------- */

		/* ---------------------- 응답 객체 -> 엔티티 시작 ----------------- */
		List<CovidSidoDaily> list = new ArrayList<CovidSidoDaily>();
		for (CovidSidoDailyResponse.Item item : response.getResponse().getBody().getItems().getItem()) {
			CovidSidoDaily record = CovidSidoDaily.builder()
					.stdDay(item.getStdDay())
					.gubun(item.getGubun())
					.incDec(item.getIncDec())
					.defCnt(item.getDefCnt())
					.overFlowCnt(item.getOverFlowCnt().isEmpty() ? null : Integer.valueOf(item.getOverFlowCnt()))
					.localOccCnt(item.getLocalOccCnt().isEmpty() ? null : Integer.valueOf(item.getLocalOccCnt()))
					.build();

			list.add(record);
		}
		/* ---------------------- 응답 객체 -> 엔티티 끝 ----------------- */

		/* ---------------------- 엔티티객체 -> 리포지터리로 저장 시작 ----------------- */
		repo.saveAll(list);
		/* ---------------------- 엔티티객체 -> 리포지터리로 저장 끝 ----------------- */
	}
}