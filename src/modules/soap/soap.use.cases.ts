import { INestApplication } from "@nestjs/common";
import { CreateCustomerDto } from "./dtos/create-cliente.dto";
import { Customer } from "./entities/customer";
import { RechargeWalletDto } from "./dtos/recharge-balance.dto";
import { PayDto } from "./dtos/pay.dto";
import { CheckBalanceDto } from "./dtos/check-balance.dto";
import { SoapService } from "./soap.service";

export function createServices(app: INestApplication){
    let services = {};
    services = {
    CustomerService: {
      CustomerServiceSoapPort: {
        createCustomer: async function(args): Promise<ApiResponse<Customer>> {
            try{
                console.log('ARGS:', args);
                const dto = new CreateCustomerDto();
                dto.document = args.document;
                dto.email = args.email;
                dto.name = args.name;
                dto.phone = args.phone;
                const result = await app.get(SoapService).createCustomer(dto);

                return {
                    success: true,
                    cod_error: '00',
                    message_error: 'Cliente creado con éxito',
                    data: result,
                };
            }catch(err){
                return {
                    success: false,
                    cod_error: '500',
                    message_error: err.message || 'Error interno del servidor',
                    data: null,
                };
            }
          
        },
        rechargeWallet: async function(args): Promise<ApiResponse<string>>{
            try{
                const dto = new RechargeWalletDto()
                dto.document = args.document;
                dto.phone = args.phone;
                dto.value = args.value;
                const result =  await app.get(SoapService).rechargeWallet(args);

                return {
                    cod_error: '00',
                    message_error: 'Recarga exitosa',
                    success: true,
                    data: result
                }

            }catch(err) {
                return {
                    success: false,
                    cod_error: '500',
                    message_error: err.message || 'Error interno del servidor',
                    data: null,
                };
            }
        },
        initPayment: async function(args):  Promise<ApiResponse<any>> {
            try{
                console.log('args: ', args)
                const dto = new PayDto();
                dto.amount = args.amount;
                dto.document = args.document;
                dto.phone = args.phone;
                const result = await app.get(SoapService).initPayment(dto);
                return {
                    cod_error: '00',
                    message_error: 'Se envío la solicitud de manera exitosa',
                    success: true,
                    data: result
                }
            }catch(err){
                console.log('err: ', err)
                return {
                    success: false,
                    cod_error: '500',
                    message_error: err.message || 'Error interno del servidor',
                    data: null,
                };
            }
        },
        confirmPayment: async function(args): Promise<ApiResponse<any>>{
            try{
                const sessionId = args.sessionId;
                const token = args.token;
                const result = await app.get(SoapService).confirmPayment(sessionId,token);

                return {
                    cod_error: '00',
                    message_error: 'Recarga exitosa',
                    success: true,
                    data: result
                }
            }catch(err) {
                return {
                    success: false,
                    cod_error: '500',
                    message_error: err.message || 'Error interno del servidor',
                    data: null,
                };
            }
            
        },
        checkBalance: async function(args): Promise<ApiResponse<any>> {
            try{
                const dto =  new CheckBalanceDto();
                dto.document = args.document;
                dto.phone = args.phone;
                const result = await app.get(SoapService).checkBalance(dto);

                return {
                    cod_error: '00',
                    message_error: 'Consulta exitosa.',
                    success: true,
                    data: result
                }

            }catch(err){
                return {
                    success: false,
                    cod_error: '500',
                    message_error: err.message || 'Error interno del servidor',
                    data: null,
                };
            }
        }
      },
    },
  };
  return services;
}
