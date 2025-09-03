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
    this.b = new BaseService();
    // this.logger = new Logging();
    this.serviceModel = new CdAiModel();
  }

  private constructor(): void {
    // TODO: implement
  }

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

  private validateCreate(): void {
    // TODO: implement
  }

  private cdAiExists(): void {
    // TODO: implement
  }

  private getCdAiCount(): void {
    // TODO: implement
  }

  private getCdAiType(): void {
    // TODO: implement
  }

  private getCdAiProfile(): void {
    // TODO: implement
  }

  private getCdAiProfileByToken(): void {
    // TODO: implement
  }

  private getScopedCdAi(): void {
    // TODO: implement
  }

  private updateCdAiProfile(): void {
    // TODO: implement
  }

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

  private delete(): void {
    // TODO: implement
  }

  private activateCdAi(): void {
    // TODO: implement
  }

  private promptQuery(): void {
    // TODO: implement
  }

  private checkTokenBalance(): void {
    // TODO: implement
  }

  private getUserProfile(): void {
    // TODO: implement
  }
}