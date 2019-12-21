import * as Router from 'koa-router';
import * as Config from '../config';
import { fluentProvide } from 'inversify-binding-decorators';
const provideThrowable = (identity, name) => fluentProvide(identity).whenNoAncestorNamed(name).done()

export { Router, provideThrowable, Config };
export { Container, inject, injectable } from 'inversify';
export { provide, buildProviderModule } from 'inversify-binding-decorators';
export { TAGS } from '../constant/TAGS';
export { InversifyKoaServer, interfaces, controller, httpGet, httpPost, TYPE } from 'inversify-koa-utils';
