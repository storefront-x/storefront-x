export default () => (data: any) => ({
  code: `${data.carrier_code}_${data.method_code}`,
  carrierCode: data.carrier_code as string,
  carrierTitle: data.carrier_title as string,
  methodCode: data.method_code as string,
  methodTitle: data.method_title as string,
})
