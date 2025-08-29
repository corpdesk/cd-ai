/**
     * {
        "ctx": "App",
        "m": "cd-ai-types",
        "c": "cd-ai-type",
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
    this.logger.logInfo('cd-ai-typeTypecreate::validateCreate()/01');

    const svSess = new SessionService();
    if (await this.validateCreate(req, res)) {
      await this.beforeCreate(req, res);
      const serviceInput = {
        serviceModel: cd-ai-typeTypeModel,
        modelName: 'cd-ai-typeTypeModel',
        serviceModelInstance: this.serviceModel,
        docName: 'Create cd-ai-type',
        dSource: 1,
      };
      this.logger.logInfo(
        'cd-ai-typeTypeService::create()/serviceInput:',
        serviceInput,
      );
      const respData = await this.b.create(req, res, serviceInput);
      this.b.i.app_msg = 'new cd-ai-type created';
      this.b.setAppState(true, this.b.i, svSess.sessResp);
      this.b.cdResp.data = await respData;
      const r = await this.b.respond(req, res);
    } else {
      this.logger.logInfo('cd-ai-typeTypecreate::validateCreate()/02');
      const r = await this.b.respond(req, res);
    }
  }
async validateCreate(req: any, res: any) {
    this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/01');
    const svSess = new SessionService();
    ///////////////////////////////////////////////////////////////////
    // 1. Validate against duplication
    const params = {
      controllerInstance: this,
      model: cd-ai-typeTypeModel,
    };
    this.b.i.code = 'cd-ai-typeTypeService::validateCreate';
    let ret = false;
    if (await this.b.validateUnique(req, res, params)) {
      this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/02');
      if (await this.b.validateRequired(req, res, this.cRules)) {
        this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/03');
        ret = true;
      } else {
        this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/04');
        ret = false;
        this.b.i.app_msg = `the required fields ${this.b.isInvalidFields.join(', ')} is missing`;
        this.b.err.push(this.b.i.app_msg);
        this.b.setAppState(false, this.b.i, svSess.sessResp);
      }
    } else {
      this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/05');
      ret = false;
      this.b.i.app_msg = `duplicate for ${this.cRules.noDuplicate.join(', ')} is not allowed`;
      this.b.err.push(this.b.i.app_msg);
      this.b.setAppState(false, this.b.i, svSess.sessResp);
    }
    this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/06');
    ///////////////////////////////////////////////////////////////////
    // 2. confirm the abcdTypeId referenced exists
    // const pl: cd-ai-typeTypeModel = this.b.getPlData(req);
    // if ('abcdTypeId' in pl) {
    //     this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/07')
    //     this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/pl:', pl)
    //     const serviceInput = {
    //         serviceModel: cd-ai-typeTypeModel,
    //         docName: 'cd-ai-typeTypeService::validateCreate',
    //         cmd: {
    //             action: 'find',
    //             query: { where: { abcdTypeId: pl.abcdTypeId } }
    //         },
    //         dSource: 1
    //     }
    //     this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/serviceInput:', JSON.stringify(serviceInput))
    //     const r: any = await this.b.read(req, res, serviceInput)
    //     this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/r:', r)
    //     if (r.length > 0) {
    //         this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/08')
    //         ret = true;
    //     } else {
    //         this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/10')
    //         ret = false;
    //         this.b.i.app_msg = `cd-ai-type type reference is invalid`;
    //         this.b.err.push(this.b.i.app_msg);
    //         this.b.setAppState(false, this.b.i, svSess.sessResp);
    //     }
    // } else {
    //     this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/11')
    //     // this.b.i.app_msg = `parentModuleGuid is missing in payload`;
    //     // this.b.err.push(this.b.i.app_msg);
    //     //////////////////
    //     this.b.i.app_msg = `abcdTypeId is missing in payload`;
    //     this.b.err.push(this.b.i.app_msg);
    //     this.b.setAppState(false, this.b.i, svSess.sessResp);
    // }
    this.logger.logInfo('cd-ai-typeTypeService::getcd-ai-typeType12');
    if (this.b.err.length > 0) {
      this.logger.logInfo('cd-ai-typeTypecd-ai-typeTypeService::validateCreate()/13');
      ret = false;
    }
    return ret;
  }

      async cdAiExists(): Promise<void> {
        // TODO: implement service logic for cdAiExists
      }
    

      async getCdAiCount(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiCount
      }
    
update(req: any, res: any) {
    // this.logger.logInfo('cd-ai-typeTypeService::update()/01');
    let q = this.b.getQuery(req);
    q = this.beforeUpdate(q);
    const serviceInput = {
      serviceModel: cd-ai-typeTypeModel,
      docName: 'cd-ai-typeTypeService::update',
      cmd: {
        action: 'update',
        query: q,
      },
      dSource: 1,
    };
    // this.logger.logInfo('cd-ai-typeTypeService::update()/02')
    this.b.update$(req, res, serviceInput).subscribe((ret) => {
      this.b.cdResp.data = ret;
      this.b.respond(req, res);
    });
  }
delete(req: any, res: any) {
    const q = this.b.getQuery(req);
    this.logger.logInfo('cd-ai-typeTypeService::delete()/q:', q);
    const serviceInput = {
      serviceModel: cd-ai-typeTypeModel,
      docName: 'cd-ai-typeTypeService::delete',
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

      async getCdAiProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiProfile
      }
    

      async getCdAiProfileByToken(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getCdAiProfileByToken
      }
    

      async getScopedCdAi(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for getScopedCdAi
      }
    

      async updateCdAiProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for updateCdAiProfile
      }
    

      async activateCdAi(): Promise<void> {
        // TODO: implement service logic for activateCdAi
      }
    

      async PromptQuery(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for PromptQuery
      }
    

      async CheckTokenBalance(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for CheckTokenBalance
      }
    

      async GetUserProfile(req: Request, res: Response): Promise<void> {
        // TODO: implement service logic for GetUserProfile
      }
    