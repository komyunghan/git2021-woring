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
		// OLAP Cube �������� ������
		// ����, ī�װ�, �ð�, ��
		
		// ���ؽð�
		private String stdDay;
		// ���ø�
		private String gubun;
		// ���� ��� ����
		private String incDec;
		// Ȯ���� ��
		private String defCnt;
		// �ؿ�����
		private String overFlowCnt;
		// �����߻�
		private String localOccCnt;

	}
}