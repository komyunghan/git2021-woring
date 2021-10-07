package com.git.myworkspace.opendata.covid;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(indexes = @Index(name = "idx_covid_sido_daily_1", columnList = "stdDay, gubun"))
@IdClass(CovidSidoDailyId.class)
public class CovidSidoDaily {

	// 시간, 시도, 시군구에 유일한 데이터만 존재해야함
	// 예) 20210930 16:00, 서울, 강남구 측정된 데이터는 유일하게 1건 존재해야함
	@Id
	private String stdDay;
	@Id
	// 한글 도시명
	@Column(columnDefinition = "varchar(255) collate \"ko_KR.utf8\"")
	private String gubun;
	// 전일 대비 증감
	private String incDec;
	// 확진자 수
	private String defCnt;
	@Column(columnDefinition = "int4")
	// 해외유입
	private Integer overFlowCnt;
	// 국내발생
	private Integer localOccCnt;

}