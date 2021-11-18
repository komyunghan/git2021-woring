package com.git.TeamProject.storelist;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class StoreList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	// BLOB: binary large object
	@Column(columnDefinition = "VARCHAR(1000)")
	private String address;
	// BLOB: binary large object
	@Column(columnDefinition = "TEXT")
	private String phoneNumber;
	private String lat;
	private String lng;
}