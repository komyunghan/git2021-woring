package exam;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map �������� ������ Map ������ Ÿ��(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// �����ϴ� �ڷᱸ���� ���� ���� �޼��带 ȣ���ϴ���
	// �������� ó������� �ٸ�

	// ���¸�� Map ��ü
	// Map<ŰŸ��, ��Ÿ��> ������ = new HashMap<ŰŸ��, ��Ÿ��>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.����");
			System.out.println("----------------------------------------------------------");
			System.out.print("����> ");

			int selectNo = scanner.nextInt();

			if (selectNo == 1) {
				createAccount();
			} else if (selectNo == 2) {
				accountList();
			} else if (selectNo == 3) {
				deposit();
			} else if (selectNo == 4) {
				withdraw();
			} else if (selectNo == 5) {
				run = false;
			}
		}
		System.out.println("���α׷� ����");
	}

	// ���»����ϱ�(�����߰��ϱ�)
	private static void createAccount() {
		System.out.println("--------");
		System.out.println("���»���");
		System.out.println("--------");
		System.out.print("���¹�ȣ: ");
		String ano = scanner.next();

		System.out.print("������: ");
		String owner = scanner.next();

		System.out.print("�ʱ��Աݾ�: ");
		int balance = scanner.nextInt();

		Account account = new Account(ano, owner, balance);
		accounts.put(ano, account);

	}

	// ���¸�Ϻ���
	private static void accountList() {
		System.out.println("--------");
		System.out.println("���¸��");
		System.out.println("--------");
		for (String id : accounts.keySet()) {
			String ano = accounts.get(id).getAno();
			String owner = accounts.get(id).getOwner();
			int balance = accounts.get(id).getBalance();

			System.out.println(ano + "  " + owner + "  " + balance);
		}
	}

	// �����ϱ�(�ʵ尪����)
	private static void deposit() {

		System.out.println("--------");
		System.out.println("����");
		System.out.println("--------");
		System.out.print("���¹�ȣ: ");
		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("���ݾ�");
			int deposit = scanner.nextInt();
			Account dep = accounts.get(ano);
			dep.setBalance(dep.getBalance() + deposit);
		}
	}

	// ����ϱ�(�ʵ尪����)
	private static void withdraw() {
		System.out.println("--------");
		System.out.println("���");
		System.out.println("--------");
		System.out.print("���¹�ȣ: ");
		String ano = scanner.next();
		if (accounts.containsKey(ano)) {
			System.out.println("���");
			int withdraw = scanner.nextInt();
			Account withd = accounts.get(ano);
			withd.setBalance(withd.getBalance() - withdraw);
		}

	}
}