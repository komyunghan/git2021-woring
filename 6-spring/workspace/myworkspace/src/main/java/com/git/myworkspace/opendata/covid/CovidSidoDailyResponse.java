package com.git.myworkspace.opendata.covid;

import java.util.List;

import lombok.Data;

@Data
public class CovidSidoDailyResponse {
	private Response response;

	@Data
	public class Response {
		private Header header;
		private Body body;
	}

	@Data
	public class Header {
		private String resultCode;
		private String resultMsg;
	}

	@Data
	public class Body {
		private Items items;
	}

	@Data
	public class Items {
		private List<Item> item;
	}

	@Data
	public class Item {
		// OLAP Cube 형식으로 데이터
		// 지역, 카테고리, 시간, 값
		
		// 기준시간
		private String stdDay;
		// 도시명
		private String gubun;
		// 전일 대비 증감
		private String incDec;
		// 확진자 수
		private String defCnt;
		// 해외유입
		private String overFlowCnt;
		// 국내발생
		private String localOccCnt;

	}
}