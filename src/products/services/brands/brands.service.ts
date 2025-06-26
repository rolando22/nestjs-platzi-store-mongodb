import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll(): Promise<Brand[]> {
    const brands = await this.brandModel.find().exec();
    return brands;
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id).lean().exec();

    if (!brand) throw new NotFoundException(`Brand #${id} not found`);

    return brand;
  }

  async create(data: CreateBrandDto): Promise<Brand> {
    const newBrand = new this.brandModel(data);
    const savedBrand = await newBrand.save();
    return savedBrand.toObject();
  }

  async update(id: string, changes: UpdateBrandDto): Promise<Brand> {
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .lean()
      .exec();

    if (!updatedBrand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return updatedBrand;
  }

  async delete(id: string): Promise<Brand> {
    const deletedBrand = await this.brandModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!deletedBrand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return deletedBrand;
  }
}
