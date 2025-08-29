/**
     * {
        "ctx": "App",
        "m": "cd-ai-usage-logs-types",
        "c": "cd-ai-usage-logs-type",
        "a": "Create",
        "dat": {
            "f_vals": [
            {
                "data": {
                    "abcdStatGuid":"",
                    "abcdStatName": "Benin", 
                    "abcdStatDescription":"2005",
                    "cdGeoLocationId":null,
                    "abcdWoccu": false,
                    "abcdCount": null,
                    "abcdMembersCount": 881232, 
                    "abcdSavesShares":56429394,
                    "abcdLoans":45011150,
                    "abcdReserves":null, 
                    "abcdAssets": null,
                    "abcdMemberPenetration":20.95,
                    "abcdStatDateLabel": "2005-12-31 23:59:59",
                    "abcdStatRefId":null
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
  async create(req: any, res: any) {
    this.logger.logInfo('cd-ai-usage-logs-typeTypecreate::validateCreate()/01');

    const svSess = new SessionService();
    if (await this.validateCreate(req, res)) {
      await this.beforeCreate(req, res);
      const serviceInput = {
        serviceModel: cd-ai-usage-logs-typeTypeModel,
        modelName: 'cd-ai-usage-logs-typeTypeModel',
        serviceModelInstance: this.serviceModel,
        docName: 'Create cd-ai-usage-logs-type',
        dSource: 1,
      };
      this.logger.logInfo(
        'cd-ai-usage-logs-typeTypeService::create()/serviceInput:',
        serviceInput,
      );
      const respData = await this.b.create(req, res, serviceInput);
      this.b.i.app_msg = 'new cd-ai-usage-logs-type created';
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = await respData;
      const r = await this.b.respond(req, res);
    } else {
      this.logger.logInfo('cd-ai-usage-logs-typeTypecreate::validateCreate()/02');
      const r = await this.b.respond(req, res);
    }
  }
async validateCreate(req: any, res: any) {
    this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/01');
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: cd-ai-usage-logs-typeTypeModel,
    };
    this.b.i.code = 'cd-ai-usage-logs-typeTypeService::validateCreate';
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/02');
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/03');
        ret = true;
      } else {
        this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/04');
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(', ')} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/05');
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(', ')} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/06');
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the abcdTypeId referenced exists
    // const pl: cd-ai-usage-logs-typeTypeModel = this.b.getPlData(req);
    // if ('abcdTypeId' in pl) {
    //     this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/07')
    //     this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: cd-ai-usage-logs-typeTypeModel,
    //         docName: 'cd-ai-usage-logs-typeTypeService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { abcdTypeId: pl.abcdTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `cd-ai-usage-logs-type type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `abcdTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo('cd-ai-usage-logs-typeTypeService::getcd-ai-usage-logs-typeType12');
    if (this.b.err.length > 0) {
      this.logger.logInfo('cd-ai-usage-logs-typeTypecd-ai-usage-logs-typeTypeService::validateCreate()/13');
      ret = false;
    }
    return ret;
  }

      async cdAiUsageLogsExists(): Promise<void> {
        // TODO: implement service logic for cdAiUsageLogsExists
      }
    

      async getCdAiUsageLogsCount(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiUsageLogsCount
      }
    
update(req: any, res: any) {
    // this.logger.logInfo('cd-ai-usage-logs-typeTypeService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: cd-ai-usage-logs-typeTypeModel,
      docName: 'cd-ai-usage-logs-typeTypeService::update',
      cmd: {
        action: 'update',
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('cd-ai-usage-logs-typeTypeService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
delete(req: any, res: any) {
    const q = this.b.getQuery(req);
    this.logger.logInfo('cd-ai-usage-logs-typeTypeService::delete()/q:', q);
    const serviceInput = {
      serviceModel: cd-ai-usage-logs-typeTypeModel,
      docName: 'cd-ai-usage-logs-typeTypeService::delete',
      cmd: {
        action: 'delete',
        query: q,
      },
      dSource: 1,
    };

    this.b.delete$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }

      async getCdAiUsageLogsProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiUsageLogsProfile
      }
    

      async getCdAiUsageLogsProfileByToken(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiUsageLogsProfileByToken
      }
    

      async getScopedCdAiUsageLogs(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getScopedCdAiUsageLogs
      }
    

      async updateCdAiUsageLogsProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for updateCdAiUsageLogsProfile
      }
    

      async activateCdAi(): Promise<void> {
        // TODO: implement service logic for activateCdAi
      }
    

      async LogUsage(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for LogUsage
      }
    

      async GetUsageSummary(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for GetUsageSummary
      }
    