import { BaseService } from '../../../sys/base/base.service';
import { CdAiModel } from '../models/cd-ai.model.ts.model';
import { CdAiUsageLogsModel } from '../models/cd-ai-usage-logs.model.ts.model';

export class CdAiUsageLogsService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiUsageLogsModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: object;

  constructor() {
    // TODO: initialize service
  }

  private constructor(): void {
    // TODO: implement
  }

  /**
     * Create from new company:
     *  - Create company, then create cdAiUsageLogs
     * 
     * Create from existing company
     *  - select company then create cdAiUsageLogs
    * {
       "ctx": "App",
       "m": "CdAiUsageLogss",
       "c": "CdAiUsageLogs",
       "a": "Create",
       "dat": {
           "f_vals": [
           {
               "data": {
                   "cdAiUsageLogsGuid":"",
                   "cdAiUsageLogsName": "Benin", 
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
      .mustExist("userId", CdAiUsageLogsModel)
      .mustExist("cdAiUsageLogsId", CdAiUsageLogsModel)
      .build();

    const validationCreateParams = {
      controllerInstance: this,
      model: CdAiUsageLogsModel,
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
        const pl: CdAiUsageLogsModel = this.b.getPlData(req);

        await this.b.beforeCreateGeneric(req, {
          cdAiUsageLogsGuid: "GUID",
          cdAiUsageLogsEnabled: true,
          cdAiUsageLogsTypeId: 108,
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

  private cdAiUsageLogsExists(): void {
    // TODO: implement
  }

  private getCdAiUsageLogsCount(): void {
    // TODO: implement
  }

  update(req, res) {
    // this.logger.logInfo('CdAiUsageLogsService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: CdAiUsageLogsModel,
      docName: "CdAiUsageLogsService::update",
      cmd: {
        action: "update",
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('CdAiUsageLogsService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }

  private delete(): void {
    // TODO: implement
  }

  private getCdAiUsageLogsProfile(): void {
    // TODO: implement
  }

  private getCdAiUsageLogsProfileByToken(): void {
    // TODO: implement
  }

  private getScopedCdAiUsageLogs(): void {
    // TODO: implement
  }

  private updateCdAiUsageLogsProfile(): void {
    // TODO: implement
  }

  private activateCdAi(): void {
    // TODO: implement
  }

  private logUsage(): void {
    // TODO: implement
  }

  private getUsageSummary(): void {
    // TODO: implement
  }
}