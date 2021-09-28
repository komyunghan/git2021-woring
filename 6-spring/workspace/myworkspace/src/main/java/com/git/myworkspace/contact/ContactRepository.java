package com.git.myworkspace.contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// photo ���̺� �����ϴ� ��ü

// PhotoRepository -�� JpaRepository -�� PagingAndSortingRepository -�� CrudRepository
// JpaRepository���� ������ ó���� ���� �⺻���� �޼������ ����Ǿ�����
// JpaRepository<Photo, Long>
// JpaRepository<��ƼƼŸ��, idŸ��>
// ��ƼƼ(SE, �����Ͱ�ü) == ���̺�(DB, �����Ͱ�ü)

// photo ���̺� ������ �� �ִ� �⺻���� �޼������ ����� �� ����

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}
