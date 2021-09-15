
// implement: 구현하다
// 구현클래스명 implements 인터페이스명
public class CalculatorMock implements Calculator {

	@Override
	public int plus(int a, int b) {
		// TODO Auto-generated method stub
		return 10;
	}

	@Override
	public int minus(int a, int b) {
		// TODO Auto-generated method stub
		return 5;
	}

	@Override
	public double areaCircle(int r) {
		// TODO Auto-generated method stub
		return 5 * 5 * 3.14;
	}

}