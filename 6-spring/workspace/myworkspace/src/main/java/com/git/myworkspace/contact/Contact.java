package com.git.myworkspace.contact;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
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
public class Contact {
	@Id
	@GeneratedValue
	private long id;
	private String name;
	// BLOB: binary large object
	@Column(columnDefinition = "VARCHAR(1000)")
	private String description;
	// BLOB: binary large object
	@Column(columnDefinition = "TEXT")
	private String phone;
	private String email;
	private long createdTime;
}