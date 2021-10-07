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

	// �ð�, �õ�, �ñ����� ������ �����͸� �����ؾ���
	// ��) 20210930 16:00, ����, ������ ������ �����ʹ� �����ϰ� 1�� �����ؾ���
	@Id
	private String stdDay;
	@Id
	// �ѱ� ���ø�
	@Column(columnDefinition = "varchar(255) collate \"ko_KR.utf8\"")
	private String gubun;
	// ���� ��� ����
	private String incDec;
	// Ȯ���� ��
	private String defCnt;
	@Column(columnDefinition = "int4")
	// �ؿ�����
	private Integer overFlowCnt;
	// �����߻�
	private Integer localOccCnt;

}