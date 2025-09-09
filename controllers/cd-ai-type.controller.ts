import { BaseService } from "../../../sys/base/base.service";
import { Logging } from "../../../sys/base/winston.log";
import { CdAiService } from "../services/cd-ai.service";
import { CdAiTypeService } from "../services/cd-ai-type.service";
import { CdAiUsageLogsService } from "../services/cd-ai-usage-logs.service";
import { CdAiUsageLogsTypeService } from "../services/cd-ai-usage-logs-type.service";

export class CdAiTypeController {
  private b: BaseService;

  private svCdAi: CdAiService;

  private svCdAiType: CdAiTypeService;

  // <<cd:method:constructor:start>>
  constructor() {
    // TODO: implement
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:Create:start>>
  async Create(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:Create:end>>

  // <<cd:method:GetCdAi:start>>
  async GetCdAi(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetCdAi:end>>

  // <<cd:method:GetCdAiType:start>>
  async GetCdAiType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetCdAiType:end>>

  // <<cd:method:GetCount:start>>
  async GetCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetCount:end>>

  // <<cd:method:Update:start>>
  async Update(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:Update:end>>

  // <<cd:method:Delete:start>>
  async Delete(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:Delete:end>>

  // <<cd:method:PromptQuery:start>>
  async PromptQuery(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:PromptQuery:end>>

  // <<cd:method:CheckTokenBalance:start>>
  async CheckTokenBalance(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:CheckTokenBalance:end>>

  // <<cd:method:GetUserProfile:start>>
  async GetUserProfile(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:GetUserProfile:end>>
}
