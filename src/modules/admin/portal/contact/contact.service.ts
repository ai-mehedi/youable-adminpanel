import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { PaginationUI } from 'src/common/helpers/utils/pagination-uri.utils';
import { Contact, ContactModel } from 'src/models/contact-schema';
import { InjectModel } from '@nestjs/mongoose';
import { join } from 'path';
import { RenderEjsFile } from 'src/common/helpers/utils/utils';
@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly ContactModel: ContactModel,
  ) {}

  async getContactList({
    limit,
    page,
    sortBy,
    sortOrder,
    searchText,
  }: PaginationQuery) {
    const options: PaginationOptions = { page, limit };
    const pagination = new PaginationUI();
    const renderPath = 'views/admin/portal/contacts/widgets/list.ejs';
    const searchBy = ['email'];

    limit = limit || 25;
    pagination.per_page = limit;
    const offset = (page - 1) * limit;

    options.sortOrder = {
      direction: sortOrder,
      id: sortBy,
    };

    if (searchText) {
      options.search = {
        searchText,
        searchBy,
      };
    }

    const results = await this.ContactModel.paginate({}, options);

    const paginate_ui = pagination.getAllPageLinks(
      Math.ceil(results.total / limit),
      Math.abs(results.page),
    );

    let html_data = '';
    let serial_number = offset;

    for (const result of results.records) {
      serial_number++;
      html_data += await RenderEjsFile(join(global.ROOT_DIR, renderPath), {
        result,
        serial_number,
      });
    }

    return {
      data_exist: results.total > 0,
      data: html_data,
      total_count: results.total,
      pagination: paginate_ui,
    };
  }

  async deleteContact(id: string) {
    const result = await this.ContactModel.findOneAndDelete({
      _id: id,
    });

    if (!result) {
      throw new NotFoundException({
        message: 'Contact not found',
      });
    }
    return {
      message: 'Contact deleted successfully',
    };
  }
}
