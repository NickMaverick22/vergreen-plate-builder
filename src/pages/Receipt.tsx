import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CustomerNavbar from '@/components/CustomerNavbar';

const Receipt = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: Record<string, unknown> };
  const order = state ?? {};

  if (!order.selections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No order found.</p>
      </div>
    );
  }

  const { selections, total, orderTime, code } = order as {
    selections: Record<string, unknown>;
    total: string;
    orderTime: string;
    code: string;
  };
  const typedSelections = selections as Record<string, {id:string; name:string; price:number}[]>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20">
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-16" />
          <h1 className="font-bold text-vergreen-800">Order Receipt</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <Card className="bg-white rounded-3xl neumorphic p-6 space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-vergreen-800">Thank you!</h2>
            <p className="text-sm text-vergreen-600">{orderTime}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-vergreen-800">{selections.barType?.name}</p>
            {selections.base && (
              <div className="flex justify-between text-sm">
                <span>Base: {selections.base.name}</span>
                <span>${selections.base.price}</span>
              </div>
            )}
            {['proteins','fibers','cheese','sauces'].map(cat => (
              typedSelections[cat]?.map((item: {id:string; name:string; price:number}) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))
            ))}
            <div className="border-t border-vergreen-200 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <div className="text-center pt-4 space-y-2">
            <div className="text-4xl font-bold text-vergreen-700">{code}</div>
            <p className="text-sm text-vergreen-600">Show this when collecting your order</p>
          </div>
        </Card>

        <Button className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-2xl" onClick={() => navigate('/tracking')}>
          Track Order
        </Button>
      </div>

      <CustomerNavbar />
    </div>
  );
};

export default Receipt;
