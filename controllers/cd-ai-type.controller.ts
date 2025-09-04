import { BaseService } from '../../../sys/base/base.service';
import { CdAiService } from '../services/cd-ai.service';
import { CdAiTypeService } from '../services/cd-ai-type.service';
import { CdAiUsageLogsService } from '../services/cd-ai-usage-logs.service';
import { CdAiUsageLogsTypeService } from '../services/cd-ai-usage-logs-type.service';

export class CdAiTypeController {
  
  private b: BaseService;
  
  private svCdAi: CdAiService;
  
  private svCdAiType: CdAiTypeService;

  constructor() {
    // TODO: initialize controller
  }

  // <<cd:method:constructor:start>>
  constructor(b: BaseService, svCdAi: CdAiService) {
    // TODO: implement
  }
  // <<cd:method:constructor:end>>

  // <<cd:method:create:start>>
  async create(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:create:end>>

  // <<cd:method:getCdAi:start>>
  async getCdAi(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAi:end>>

  // <<cd:method:getCdAiType:start>>
  async getCdAiType(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCdAiType:end>>

  // <<cd:method:getCount:start>>
  async getCount(req: Request, res: Response): Promise<void> {
    // TODO: implement
  }
  // <<cd:method:getCount:end>>

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