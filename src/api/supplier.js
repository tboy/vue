import request from '@/utils/request'

export default {

  getList: (ops) => {
    return request({
      url: '/rest/m/supplier/findAllSupplier',
      method: 'post',
      data: ops
    })
  },
  getUserList: (ops) => {
    return request({
      url: '/rest/m/users/getStaffOn',
      method: 'post',
      data: ops
    })
  },
  setUser: (ops) => {
    return request({
      url: '/rest/m/supplier/assignAscription',
      method: 'post',
      data: ops
    })
  },
  sendMsg: (ops) => {
    return request({
      url: '/rest/m/supplier/smsReminder',
      method: 'post',
      data: ops
    })
  },
  checkUserName: (ops) => {
    return request({
      url: '/rest/m/supplier/checkUserName',
      method: 'post',
      data: ops
    })
  },
  addSupplier: (ops) => {
    return request({
      url: '/rest/m/supplier/addSupplier',
      method: 'post',
      data: ops
    })
  },
  updateSupplier: (ops) => {
    return request({
      url: '/rest/m/supplier/updateSupplier',
      method: 'post',
      data: ops
    })
  },
  deleteSupplier: (ops) => {
    return request({
      url: '/rest/m/supplier/deleteSupplier',
      method: 'post',
      data: ops
    })
  },
  findSupplierById: (ops) => {
    return request({
      url: '/rest/m/supplier/findSupplierById',
      method: 'post',
      data: ops
    })
  },
  findAllCategoryMargin: () => {
    return request({
      url: '/mall/manager/categoryMargin/findAllCategoryMargin',
      method: 'post'
    })
  },
  findCategoryMarginById: (ops) => {
    return request({
      url: '/mall/manager/categoryMargin/findCategoryMarginById',
      method: 'post',
      data: ops
    })
  },
  addCategoryMargin: (ops) => {
    return request({
      url: '/mall/manager/categoryMargin/addCategoryMargin',
      method: 'post',
      data: ops
    })
  },
  deteleCategoryMargin: (ops) => {
    return request({
      url: '/mall/manager/categoryMargin/deteleCategoryMargin',
      method: 'post',
      data: ops
    })
  },
  updateCategoryMargin: (ops) => {
    return request({
      url: '/mall/manager/categoryMargin/updateCategoryMargin',
      method: 'post',
      data: ops
    })
  },
  getSupplierProductList: (ops) => {
    return request({
      url: '/rest/m/supplier/getSupplierProductList',
      method: 'post',
      data: ops
    })
  },
  addSupplierProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/addSupplierProduct',
      method: 'post',
      data: ops
    })
  },
  updateSupplierProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/updateSupplierProduct',
      method: 'post',
      data: ops
    })
  },
  delSupplierProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/delSupplierProduct',
      method: 'post',
      data: ops
    })
  },
  getSupplierProductApplyList: (ops) => {
    return request({
      url: '/rest/m/supplier/getSupplierProductApplyList',
      method: 'post',
      data: ops
    })
  },
  addSupplierProductApply: (ops) => {
    return request({
      url: '/rest/m/supplier/addSupplierProductApply',
      method: 'post',
      data: ops
    })
  },
  findSupplierProductById: (ops) => {
    return request({
      url: '/rest/m/supplier/findSupplierProductById',
      method: 'post',
      data: ops
    })
  },
  checkSupplierProductApply: (ops) => {
    return request({
      url: '/rest/m/supplier/checkSupplierProductApply',
      method: 'post',
      data: ops
    })
  },
  delSupplierProductApply: (ops) => {
    return request({
      url: '/rest/m/supplier/delSupplierProductApply',
      method: 'post',
      data: ops
    })
  },
  findSupplierProductLike: () => {
    return request({
      url: '/rest/m/supplier/findSupplierProductLike',
      method: 'post'
    })
  },
  addDealerProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/addDealerProduct',
      method: 'post',
      data: ops
    })
  },
  findAllDealerProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/findAllDealerProduct',
      method: 'post',
      data: ops
    })
  },
  findDealerProductById: (ops) => {
    return request({
      url: '/rest/m/supplier/findDealerProductById',
      method: 'post',
      data: ops
    })
  },
  deleteDealerProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/deleteDealerProduct',
      method: 'post',
      data: ops
    })
  },
  downAndUpDealerProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/downAndUpDealerProduct',
      method: 'post',
      data: ops
    })
  },
  updateDealerProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/updateDealerProduct',
      method: 'post',
      data: ops
    })
  },
  deletePics: (ops) => {
    return request({
      url: '/rest/m/supplier/deletePics',
      method: 'post',
      data: ops
    })
  },
  updataOpenShop: (ops) => {
    return request({
      url: '/rest/m/supplier/updataOpenShop',
      method: 'post',
      data: ops
    })
  },

  addSupplierProductCshop: (ops) => {
    return request({
      url: '/rest/m/supplier/addSupplierProductCshop',
      method: 'post',
      data: ops
    })
  },
  checkSupplierProductCshop: (ops) => {
    return request({
      url: '/rest/m/supplier/checkSupplierProductCshop',
      method: 'post',
      data: ops
    })
  },
  downAndUpCProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/downAndUpCProduct',
      method: 'post',
      data: ops
    })
  },
  getSupplierProductCshopList: (ops) => {
    return request({
      url: '/rest/m/supplier/getSupplierProductCshopList',
      method: 'post',
      data: ops
    })
  },
  getInventoryList: (ops) => {
    return request({
      url: '/rest/m/supplier/getInventoryList',
      method: 'post',
      data: ops
    })
  },
  addBshop: (ops) => {
    return request({
      url: '/rest/m/supplier/addBshop',
      method: 'post',
      data: ops
    })
  },
  getCShopByUserId: (ops) => {
    return request({
      url: '/rest/m/supplier/getCShopByUserId',
      method: 'post',
      data: ops
    })
  },
  addCShop: (ops) => {
    return request({
      url: '/rest/m/supplier/addCShop',
      method: 'post',
      data: ops
    })
  },
  updataBshop: (ops) => {
    return request({
      url: '/rest/m/supplier/updataBshop',
      method: 'post',
      data: ops
    })
  },
  findBshopByUserId: () => {
    return request({
      url: '/rest/m/supplier/findBshopByUserId',
      method: 'post'
    })
  },
  downAndUpBshopProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/downAndUpBshopProduct',
      method: 'post',
      data: ops
    })
  },
  getCShopCategoryMargin: (ops) => {
    return request({
      url: '/rest/m/supplier/getCShopCategoryMargin',
      method: 'post',
      data: ops
    })
  },
  findAllBshopProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/findAllBshopProduct',
      method: 'post',
      data: ops
    })
  },
  findBshopProductById: (ops) => {
    return request({
      url: '/rest/m/supplier/findBshopProductById',
      method: 'post',
      data: ops
    })
  },
  Settlement: (ops) => {
    return request({
      url: '/rest/m/supplier/Settlement',
      method: 'post',
      data: ops
    })
  },
  addBShopProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/addBShopProduct',
      method: 'post',
      data: ops
    })
  },
  updateBshopProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/updateBshopProduct',
      method: 'post',
      data: ops
    })
  },
  updateUpProductB: (ops) => {
    return request({
      url: '/rest/m/supplier/updateUpProductB',
      method: 'post',
      data: ops
    })
  },
  updateUpProductC: (ops) => {
    return request({
      url: '/rest/m/supplier/updateUpProductC',
      method: 'post',
      data: ops
    })
  },
  findAllBShopProductReview: (ops) => {
    return request({
      url: '/rest/m/supplier/findAllBShopProductReview',
      method: 'post',
      data: ops
    })
  },
  ReviewBShopProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/ReviewBShopProduct',
      method: 'post',
      data: ops
    })
  },
  rejectBShopProduct: (ops) => {
    return request({
      url: '/rest/m/supplier/rejectBShopProduct',
      method: 'post',
      data: ops
    })
  },
  findBShopProductOrder: (ops) => {
    return request({
      url: '/rest/m/supplier/findBShopProductOrder',
      method: 'post',
      data: ops
    })
  },
  dismantleOrder: (ops) => {
    return request({
      url: '/rest/m/supplier/dismantleOrder',
      method: 'post',
      data: ops
    })
  },
  checkStock: (ops) => {
    return request({
      url: '/rest/m/supplier/checkStock',
      method: 'post',
      data: ops
    })
  },
  findBorder: (ops) => {
    return request({
      url: '/rest/m/supplier/findBorder',
      method: 'post',
      data: ops
    })
  },
  BShipWholesaleOrder: (ops) => {
    return request({
      url: '/rest/m/supplier/BShipWholesaleOrder',
      method: 'post',
      data: ops
    })
  },
  getCOrderList: (ops) => {
    return request({
      url: '/rest/m/supplier/getCOrderList',
      method: 'post',
      data: ops
    })
  },
  getCOrderDetail: (ops) => {
    return request({
      url: '/rest/m/supplier/getCOrderDetail',
      method: 'post',
      data: ops
    })
  },
  orderSplit: (ops) => {
    return request({
      url: '/rest/m/supplier/orderSplit',
      method: 'post',
      data: ops
    })
  },
  forward: (ops) => {
    return request({
      url: '/rest/m/supplier/forward',
      method: 'post',
      data: ops
    })
  },
  doDelivery: (ops) => {
    return request({
      url: '/rest/m/supplier/doDelivery',
      method: 'post',
      data: ops
    })
  },
  delSupplierProductCshop: (ops) => {
    return request({
      url: '/rest/m/supplier/delSupplierProductCshop',
      method: 'post',
      data: ops
    })
  },
  handleDeliver: (ops) => {
    return request({
      url: '/rest/m/supplier/handleDeliver',
      method: 'post',
      data: ops
    })
  },
  getDeliverInfo: (ops) => {
    return request({
      url: '/rest/m/supplier/getDeliverInfo',
      method: 'post',
      data: ops
    })
  },
  deleteBshopProductById: (ops) => {
    return request({
      url: '/rest/m/supplier/deleteBshopProductById',
      method: 'post',
      data: ops
    })
  },
  findSupplierProductByDistributor: (ops) => {
    return request({
      url: '/rest/m/shop/findSupplierProductByDistributor',
      method: 'post',
      data: ops
    })
  },
  findDistributororder: (ops) => {
    return request({
      url: '/rest/m/shop/findDistributororder',
      method: 'post',
      data: ops
    })
  },
  getDeliveryByDistributororder: (ops) => {
    return request({
      url: '/rest/m/shop/getDeliveryByDistributororder',
      method: 'post',
      data: ops
    })
  },
  findOrderBack: (ops) => {
    return request({
      url: '/rest/m/supplier/findOrderBack',
      method: 'post',
      data: ops
    })
  },
  addorderBack: (ops) => {
    return request({
      url: '/rest/m/supplier/addorderBack',
      method: 'post',
      data: ops
    })
  },
  findDistributorByUserId: () => {
    return request({
      url: '/rest/m/supplier/findDistributorByUserId',
      method: 'post'
    })
  },
  findSupplierList: (ops) => {
    return request({
      url: '/rest/m/Website/findsupplierList',
      method: 'post',
      data: ops
    })
  },
  SupplierReviewYes: (ops) => {
    return request({
      url: '/rest/m/Website/SupplierReviewYes',
      method: 'post',
      data: ops
    })
  },
  SupplierReviewNo: (ops) => {
    return request({
      url: '/rest/m/Website/SupplierReviewNo',
      method: 'post',
      data: ops
    })
  }
}
