import { BaseService } from "../../../sys/base/base.service";
import { Logging } from "../../../sys/base/winston.log";
import { ValidationRulesBuilder } from "../../../sys/base/validation-rules-builder";
import { SessionService } from "../../../sys/user/services/session.service";
import { CdAiModel } from "../models/cd-ai.model";
import { CdAiTypeModel } from "../models/cd-ai-type.model";
import { CdAiViewModel } from "../models/cd-ai-view.model";
import { CdAiUsageLogsModel } from "../models/cd-ai-usage-logs.model";
import { CdAiUsageLogsTypeModel } from "../models/cd-ai-usage-logs-type.model";
import { CdAiUsageLogsViewModel } from "../models/cd-ai-usage-logs-view.model";

export class CdAiTypeService {
  logger: Logging;
  b: BaseService;
  cdToken: string;
  uid: number;
  serviceModel: CdAiModel;
  svSess: SessionService;
  validationCreateParams: any;
  cRules: any = {
    required: ["cdAiName", "cdAiTypeId"],
    noDuplicate: ["cdAiName", "cdAiTypeId"],
  };

  // <<cd:method:constructor:start>>
  constructor() {
    // TODO: implement
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:create:start>>
  async create(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:create:end>>

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

  // <<cd:method:update:start>>
  async update(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:update:end>>

  // <<cd:method:delete:start>>
  async delete(req: Request, res: Response): Promise<void> {
    // TODO: implement
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
