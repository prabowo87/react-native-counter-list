// counterReducer.js

const initialState = {
    subTotal: 0,
    discount: 0,
    total: 0,
    inputVal:'',
    itemList: [
      // Initial list items with counter
      { imageUrl: "https://via.placeholder.com/30x30",item: 'Product 1', price: 100000, counter: 0 },
      { imageUrl: "https://via.placeholder.com/30x30",item: 'Product 2', price: 50000, counter: 0 },
      // ... add more items as needed
    ],
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_COUNTER':
        let newSubTotal = 0;
        state.itemList= state.itemList.map((item,index) =>{
          
          if (index===action.payload.index){
            item.counter= item.counter + 1 
            return item;
          }else{
            return item;
          }
        
        });
        // console.log(index);
        // console.log(action.payload.index);
        // console.log(state.itemList);
        newSubTotal = 0;
        state.itemList.forEach(item=>{
          newSubTotal+=item.counter*item.price;
        });
        state.subTotal =newSubTotal;
        
        state.total = state.subTotal - state.discount;
        return {...state,action}
        
      case 'DECREMENT_COUNTER':
        newSubTotal = 0;
        state.itemList= state.itemList.map((item,index) =>{
          if (index===action.payload.index){
            item.counter= item.counter - 1
            if (item.counter<0){
              item.counter = 0;
            } 
            return item;
          }else{
            return item;
          }
        
        });
        // console.log(state.itemList);
        newSubTotal = 0;
        state.itemList.forEach(item=>{
          newSubTotal+=item.counter*item.price;
        });
        state.subTotal =newSubTotal;
       
        state.total = state.subTotal - state.discount;
        return {...state,action}
      case 'INPUT_VOUCHER':
        const inputValue = action.payload.inputVal;
        state.inputVal = inputValue;
        return {...state,action}
      case 'APPLY_VOUCHER':
        state.discount = calculateDiscount(state.inputVal,state.subTotal)
        state.total = state.subTotal - state.discount;
        return {...state,action}
      default:
        return state;
    }
  };

  function calculateDiscount(kodeVoucher='avatech',subtotal){
    let discount=0;
    if (kodeVoucher==='avatech'){
      discount=0.5 * subtotal;
      if (discount>200000){
        discount=200000;
      }
    }
    return discount;
  }
  
  export default counterReducer;
  