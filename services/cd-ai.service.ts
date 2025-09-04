import { BaseService } from '../../../sys/base/base.service';
import { CdAiModel } from '../models/cd-ai.model.ts.model';
import { CdAiTypeModel } from '../models/cd-ai-type.model.ts.model';
import { CdAiUsageLogsModel } from '../models/cd-ai-usage-logs.model.ts.model';
import { CdAiUsageLogsTypeModel } from '../models/cd-ai-usage-logs-type.model.ts.model';

export class CdAiService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: object;

  constructor() {
    // TODO: initialize service
  }

  // <<cd:method:constructor:start>>
constructor() {
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiModel();
  }
// <<cd:method:constructor:end>>

  async create(data: any): Promise<any> {
    // TODO: implement create logic
    return data;
  }

  // <<cd:method:validateCreate:start>>
  async validateCreate(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:validateCreate:end>>

  // <<cd:method:cdAiExists:start>>
  async cdAiExists(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:cdAiExists:end>>

  // <<cd:method:getCdAiCount:start>>
  async getCdAiCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiCount:end>>

  // <<cd:method:getCdAiQB:start>>
  async getCdAiQB(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiQB:end>>

  // <<cd:method:getCdAiType:start>>
  async getCdAiType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiType:end>>

  // <<cd:method:getCdAiProfile:start>>
  async getCdAiProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiProfile:end>>

  // <<cd:method:getCdAiProfileByToken:start>>
  async getCdAiProfileByToken(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiProfileByToken:end>>

  // <<cd:method:getScopedCdAi:start>>
  async getScopedCdAi(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getScopedCdAi:end>>

  // <<cd:method:updateCdAiProfile:start>>
  async updateCdAiProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:updateCdAiProfile:end>>

  async update(id: string, data: any): Promise<any> {
    // TODO: implement update logic
    return data;
  }

  // <<cd:method:delete:start>>
delete(req, res) {
    const q = this.b.getQuery(req);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::delete",
      cmd: {
        action: "delete",
        query: q,
      },
      dSource: 1,
    };

    this.b.delete$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
// <<cd:method:delete:end>>

  // <<cd:method:activateCdAi:start>>
  async activateCdAi(): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:activateCdAi:end>>

  // <<cd:method:promptQuery:start>>
  async promptQuery(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:promptQuery:end>>

  // <<cd:method:checkTokenBalance:start>>
  async checkTokenBalance(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:checkTokenBalance:end>>

  // <<cd:method:getUserProfile:start>>
  async getUserProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getUserProfile:end>>
}
// <<cd:method:create:start>>
/**
     * Create from new company:
     *  - Create company, then create cdAi
     * 
     * Create from existing company
     *  - select company then create cdAi
    * {
       "ctx": "App",
       "m": "CdAis",
       "c": "CdAi",
       "a": "Create",
       "dat": {
           "f_vals": [
           {
               "data": {
                   "cdAiGuid":"",
                   "cdAiName": "Benin", 
               }
           }
           ],
           "token": "3ffd785f-e885-4d37-addf-0e24379af338"
       },
       "args": {}
       }
    * @param req
    * @param res
    */
  async create(req, res) {
    const svSess = new SessionService();
    const fValsArray = req.body.dat.f_vals || [];
    const results: any[] = [];

    // Build rules + existence map once
    const { rules, existenceMap } = new ValidationRulesBuilder()
      .require(...this.cRules.required)
      .noDuplicate(...this.cRules.noDuplicate)
      .mustExist("userId", CdAiModel)
      .mustExist("cdAiId", CdAiModel)
      .build();

    const validationCreateParams = {
      controllerInstance: this,
      model: CdAiModel,
    };

    for (let fVal of fValsArray) {
      req.body.dat.f_vals = [fVal];

      if (
        await this.b.validateCreateGeneric(
          req,
          res,
          rules,
          existenceMap,
          validationCreateParams
        )
      ) {
        // Success path
        const pl: CdAiModel = this.b.getPlData(req);

        await this.b.beforeCreateGeneric(req, {
          cdAiGuid: "GUID",
          cdAiEnabled: true,
          cdAiTypeId: 108,
        });

        const serviceInput = this.b.serviceInputCRUD(this);
        const respData = await this.b.create(req, res, serviceInput);
        results.push(respData);
      } else {
        // Failure path
        this.b.i.app_msg = `Validation failed`;
        this.b.err.push(this.b.i.app_msg);
        await this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    }

    if (this.b.err.length > 0) {
      this.b.cdResp.app_state.info.messages = this.b.err;
      await this.b.setAppState(false, this.b.i, svSess.sessResp);
    } else {
      await this.b.setAppState(true, this.b.i, svSess.sessResp);
    }

    this.b.cdResp.data = results;
    await this.b.respond(req, res);
  }
// <<cd:method:create:end>>

// <<cd:method:update:start>>
update(req, res) {
    // this.logger.logInfo('CdAiService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiModel,
      docName: "CdAiService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
// <<cd:method:update:end>>
